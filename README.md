# find-new-movies

**Next.js App Router + TypeScript movie app backed by TMDB**, with a thin API layer, ISR-style caching, and a componentized UI.

Browse trending and categorized lists, open movie detail pages with cast and related titles, and watch trailers via the YouTube IFrame API. Data is fetched on the server through a small TMDB client (`lib/tmdb`) with time-based revalidation, and raw API shapes are mapped into props for presentational components.

## Tech stack

- **Framework:** [Next.js](https://nextjs.org) (App Router), React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS, UI primitives (Radix-style `components/ui`)
- **Data:** [The Movie Database (TMDB)](https://www.themoviedb.org/) API v3
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics)

## Prerequisites

- Node.js 20+ (LTS recommended for Next.js 16)
- A TMDB API key with **Bearer** auth (see [TMDB API settings](https://www.themoviedb.org/settings/api))

## Environment variables

Create a `.env.local` (or `.env`) in the project root:

```bash
TMDB_API_KEY=your_tmdb_bearer_token
```

The app sends this value as `Authorization: Bearer …` in `lib/tmdb/tmdb-client.ts`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run production server
npm run lint    # ESLint
```

## Development notes

This project was initially bootstrapped with [v0](https://v0.app). The repository may still be linked for design iteration; merges to `main` can deploy automatically depending on your Vercel setup.

[Continue on v0 →](https://v0.app/chat/projects/prj_YaZDvR2ThAzazzOJwPyQa5yCvuvO)

<a href="https://v0.app/chat/api/kiro/clone/nmukassa1/find-new-movies" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- [TMDB API](https://developer.themoviedb.org/docs)
