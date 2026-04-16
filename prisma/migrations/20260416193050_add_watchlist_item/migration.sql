-- CreateEnum
CREATE TYPE "WatchlistMediaType" AS ENUM ('MOVIE', 'TV');

-- CreateTable
CREATE TABLE "WatchlistItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaType" "WatchlistMediaType" NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "posterUrl" TEXT NOT NULL,
    "releaseYear" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WatchlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WatchlistItem_userId_createdAt_idx" ON "WatchlistItem"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistItem_userId_mediaType_tmdbId_key" ON "WatchlistItem"("userId", "mediaType", "tmdbId");

-- AddForeignKey
ALTER TABLE "WatchlistItem" ADD CONSTRAINT "WatchlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
