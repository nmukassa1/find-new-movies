import { prisma } from "@/lib/prisma/client";
import type {
  WatchlistSnapshotInput,
} from "@/lib/validations/watchlist";

/** Aligns with Prisma `WatchlistMediaType` and `watchlistSnapshotSchema`. */
export type WatchlistMediaType = WatchlistSnapshotInput["mediaType"];

export type WatchlistItemRow = {
  id: string;
  mediaType: WatchlistMediaType;
  tmdbId: number;
  title: string;
  posterUrl: string;
  releaseYear: number | null;
  createdAt: Date;
};

function toRow(item: {
  id: string;
  mediaType: WatchlistMediaType;
  tmdbId: number;
  title: string;
  posterUrl: string;
  releaseYear: number | null;
  createdAt: Date;
}): WatchlistItemRow {
  return {
    id: item.id,
    mediaType: item.mediaType,
    tmdbId: item.tmdbId,
    title: item.title,
    posterUrl: item.posterUrl,
    releaseYear: item.releaseYear,
    createdAt: item.createdAt,
  };
}

export async function hasWatchlistItem(
  userId: string,
  mediaType: WatchlistMediaType,
  tmdbId: number,
): Promise<boolean> {
  const row = await prisma.watchlistItem.findUnique({
    where: {
      userId_mediaType_tmdbId: { userId, mediaType, tmdbId },
    },
    select: { id: true },
  });
  return Boolean(row);
}

/** Creates or refreshes snapshot fields if the row already exists. */
export async function upsertWatchlistItem(
  userId: string,
  input: WatchlistSnapshotInput,
): Promise<WatchlistItemRow> {
  const mediaType = input.mediaType;
  const releaseYear =
    input.releaseYear === null || input.releaseYear === undefined
      ? null
      : input.releaseYear;

  const item = await prisma.watchlistItem.upsert({
    where: {
      userId_mediaType_tmdbId: {
        userId,
        mediaType,
        tmdbId: input.tmdbId,
      },
    },
    create: {
      userId,
      mediaType,
      tmdbId: input.tmdbId,
      title: input.title,
      posterUrl: input.posterUrl,
      releaseYear,
    },
    update: {
      title: input.title,
      posterUrl: input.posterUrl,
      releaseYear,
    },
  });

  return toRow(item);
}

export async function removeWatchlistItem(
  userId: string,
  mediaType: WatchlistMediaType,
  tmdbId: number,
): Promise<boolean> {
  const result = await prisma.watchlistItem.deleteMany({
    where: { userId, mediaType, tmdbId },
  });
  return result.count > 0;
}

export async function listWatchlistItems(
  userId: string,
): Promise<WatchlistItemRow[]> {
  const rows = await prisma.watchlistItem.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toRow);
}

export async function toggleWatchlistItem(
  userId: string,
  input: WatchlistSnapshotInput,
): Promise<{ inWatchlist: boolean }> {
  const mediaType = input.mediaType;
  const exists = await hasWatchlistItem(userId, mediaType, input.tmdbId);
  if (exists) {
    await removeWatchlistItem(userId, mediaType, input.tmdbId);
    return { inWatchlist: false };
  }
  await upsertWatchlistItem(userId, input);
  return { inWatchlist: true };
}
