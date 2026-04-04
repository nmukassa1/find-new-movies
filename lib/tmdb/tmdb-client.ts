const BASE_URL = "https://api.themoviedb.org/3";

const DEFAULT_PARAMS = {
  include_adult: "false",
  language: "en-US",
};

export async function tmdbFetch<T>(
  endpoint: string,
  params?: Record<string, string | number>,
  revalidate = 3600,
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);

  const mergedParams = {
    ...DEFAULT_PARAMS,
    ...params,
  };

  Object.entries(mergedParams).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      "Content-Type": "application/json",
    },
    next: {
      revalidate,
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB Error: ${res.statusText || res.status}`);
  }

  return res.json();
}
