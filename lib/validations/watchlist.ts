import { z } from "zod";

export const watchlistMediaTypeSchema = z.enum(["MOVIE", "TV"]);

/** Payload stored on add/upsert; matches `WatchlistItem` snapshot fields. */
export const watchlistSnapshotSchema = z.object({
  mediaType: watchlistMediaTypeSchema,
  tmdbId: z.number().int().positive(),
  title: z.string().trim().min(1).max(500),
  posterUrl: z.string().trim().min(1).max(2048),
  releaseYear: z
    .number()
    .int()
    .min(1800)
    .max(2100)
    .optional()
    .nullable(),
});

export type WatchlistSnapshotInput = z.infer<typeof watchlistSnapshotSchema>;
