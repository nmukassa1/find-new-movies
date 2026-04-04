// --- Movies (list items) ---
export type TMDBMovie = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  media_type: string;
  video: boolean;
};

// --- Movie Details ---
export type TMDBMovieDetails = TMDBMovie & {
  runtime: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  status: string;
  tagline: string | null;
};

// --- Images ---
export type TMDBImage = {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio: number;
  vote_average: number;
  vote_count: number;
  iso_639_1: string | null;
};

export type TMDBImagesResponse = {
  id: number;
  backdrops: TMDBImage[];
  posters: TMDBImage[];
  logos: TMDBImage[];
};

// --- Videos ---
export type TMDBVideo = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
};

export type TMDBVideosResponse = {
  id: number;
  results: TMDBVideo[];
};

// --- Paginated Response ---
export type TMDBPaginatedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};
