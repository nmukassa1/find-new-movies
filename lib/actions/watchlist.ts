"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import {
  hasWatchlistItem,
  listWatchlistItems,
  removeWatchlistItem,
  toggleWatchlistItem,
  type WatchlistMediaType,
  upsertWatchlistItem,
} from "@/lib/services/watchlist/watchlist";
import {
  watchlistSnapshotSchema,
  type WatchlistSnapshotInput,
} from "@/lib/validations/watchlist";

export type WatchlistActionError = "UNAUTHORIZED" | "VALIDATION";

export type ToggleWatchlistResult =
  | { ok: true; inWatchlist: boolean }
  | { ok: false; error: WatchlistActionError };

export async function toggleWatchlistItemAction(
  raw: unknown,
): Promise<ToggleWatchlistResult> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return { ok: false, error: "UNAUTHORIZED" };
  }

  const parsed = watchlistSnapshotSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "VALIDATION" };
  }

  const result = await toggleWatchlistItem(userId, parsed.data);
  return { ok: true, inWatchlist: result.inWatchlist };
}

/** Guests are treated as not on the watchlist (no error). */
export async function getWatchlistMembershipAction(
  mediaType: WatchlistMediaType,
  tmdbId: number,
): Promise<{ inWatchlist: boolean }> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return { inWatchlist: false };
  }

  const inWatchlist = await hasWatchlistItem(userId, mediaType, tmdbId);
  return { inWatchlist };
}

export type WatchlistListResult =
  | { ok: true; items: Awaited<ReturnType<typeof listWatchlistItems>> }
  | { ok: false; error: "UNAUTHORIZED" };

export async function listWatchlistItemsAction(): Promise<WatchlistListResult> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return { ok: false, error: "UNAUTHORIZED" };
  }

  const items = await listWatchlistItems(userId);
  return { ok: true, items };
}

export type AddWatchlistResult =
  | { ok: true }
  | { ok: false; error: WatchlistActionError };

/** Idempotent add / snapshot refresh (same as upsert). */
export async function addWatchlistItemAction(
  raw: unknown,
): Promise<AddWatchlistResult> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return { ok: false, error: "UNAUTHORIZED" };
  }

  const parsed = watchlistSnapshotSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "VALIDATION" };
  }

  await upsertWatchlistItem(userId, parsed.data);
  return { ok: true };
}

export type RemoveWatchlistResult =
  | { ok: true; removed: boolean }
  | { ok: false; error: WatchlistActionError };

export async function removeWatchlistItemAction(
  mediaType: WatchlistMediaType,
  tmdbId: number,
): Promise<RemoveWatchlistResult> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return { ok: false, error: "UNAUTHORIZED" };
  }

  const removed = await removeWatchlistItem(userId, mediaType, tmdbId);
  return { ok: true, removed };
}
