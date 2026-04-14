import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export class RateLimitError extends Error {
  readonly status = 429;

  constructor(message = "Too many requests") {
    super(message);
    this.name = "RateLimitError";
  }
}

const memoryBuckets = new Map<string, { count: number; resetAt: number }>();

function getUpstashRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/** Upstash sliding-window duration literals (see @upstash/ratelimit). */
export type RateLimitWindow = "1 h" | "15 m" | "10 s" | "5 m" | "1 m";

const upstashLimiters: Record<string, Ratelimit> = {};

function getUpstashLimiter(
  name: string,
  limit: number,
  windowLabel: RateLimitWindow,
): Ratelimit {
  const key = `${name}:${limit}:${windowLabel}`;
  if (!upstashLimiters[key]) {
    const redis = getUpstashRedis();
    if (!redis) throw new Error("Upstash Redis not configured");
    upstashLimiters[key] = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, windowLabel),
      prefix: "find-new-movies",
    });
  }
  return upstashLimiters[key];
}

async function limitMemory(
  key: string,
  limit: number,
  windowMs: number,
): Promise<void> {
  const now = Date.now();
  let bucket = memoryBuckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + windowMs };
    memoryBuckets.set(key, bucket);
  }
  bucket.count += 1;
  if (bucket.count > limit) {
    throw new RateLimitError();
  }
}

/**
 * Sliding-window rate limit. Uses Upstash when UPSTASH_* env vars are set;
 * otherwise falls back to in-memory limits (single Node process only — not for multi-instance production).
 */
export async function rateLimit(options: {
  /** Logical bucket, e.g. "register" */
  name: string;
  /** Distinct key within the bucket, usually client IP */
  identifier: string;
  limit: number;
  /** Window duration for Upstash (e.g. "1 h", "15 m") */
  windowLabel: RateLimitWindow;
  /** Same window in ms for memory fallback */
  windowMs: number;
}): Promise<void> {
  const key = `${options.name}:${options.identifier}`;
  if (getUpstashRedis()) {
    const limiter = getUpstashLimiter(
      options.name,
      options.limit,
      options.windowLabel,
    );
    const { success } = await limiter.limit(key);
    if (!success) throw new RateLimitError();
    return;
  }
  await limitMemory(key, options.limit, options.windowMs);
}

export function getRequestIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}
