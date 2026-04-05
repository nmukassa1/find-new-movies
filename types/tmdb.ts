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
  id: string;
  results: {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
  }[];
};

// --- Paginated Response ---
export type TMDBPaginatedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type TMDBUpcomingMoviesResponse = TMDBPaginatedResponse<TMDBMovie> & {
  dates: {
    maximum: string;
    minimum: string;
  };
};

// --- Credits ---
export type TMDBCastCredit = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  cast_id?: number;
  credit_id: string;
  order: number;
};

export type TMDBCrewCredit = {
  id: number;
  name: string;
  job: string;
  department?: string;
  credit_id?: string;
};

export type TMDBCredits = {
  cast: TMDBCastCredit[];
  crew: TMDBCrewCredit[];
};

// --- Release dates (certifications) ---
export type TMDBReleaseDateItem = {
  certification: string;
  iso_639_1: string;
  release_date: string;
  type?: number;
  note?: string;
};

export type TMDBCountryReleaseDates = {
  iso_3166_1: string;
  release_dates: TMDBReleaseDateItem[];
};

export type TMDBReleaseDatesBlock = {
  results: TMDBCountryReleaseDates[];
};

/** Movie details + `append_to_response` payloads from getMovieDetails */
export type TMDBMovieDetailsAppended = TMDBMovieDetails & {
  production_companies?: { id: number; name: string }[];
  spoken_languages?: { english_name: string; iso_639_1: string; name: string }[];
  videos?: { results: TMDBVideo[] };
  images?: TMDBImagesResponse;
  credits?: TMDBCredits;
  recommendations?: TMDBPaginatedResponse<TMDBMovie>;
  similar?: TMDBPaginatedResponse<TMDBMovie>;
  release_dates?: TMDBReleaseDatesBlock;
};
