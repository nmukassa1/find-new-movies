/**
 * TMDB movie genre ids (US list).
 * @see https://developer.themoviedb.org/reference/genre-movie-list
 */
export const TMDB_MOVIE_GENRES = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  ScienceFiction: 878,
  Thriller: 53,
  TVMovie: 10770,
  War: 10752,
  Western: 37,
} as const;

export type TMDBMovieGenreKey = keyof typeof TMDB_MOVIE_GENRES;

export type TMDBMovieGenreId =
  (typeof TMDB_MOVIE_GENRES)[TMDBMovieGenreKey];

/** Human-readable labels (for UI); keys match `TMDB_MOVIE_GENRES`. */
export const TMDB_MOVIE_GENRE_LABELS = {
  Action: "Action",
  Adventure: "Adventure",
  Animation: "Animation",
  Comedy: "Comedy",
  Crime: "Crime",
  Documentary: "Documentary",
  Drama: "Drama",
  Family: "Family",
  Fantasy: "Fantasy",
  History: "History",
  Horror: "Horror",
  Music: "Music",
  Mystery: "Mystery",
  Romance: "Romance",
  ScienceFiction: "Science Fiction",
  Thriller: "Thriller",
  TVMovie: "TV Movie",
  War: "War",
  Western: "Western",
} as const satisfies Record<TMDBMovieGenreKey, string>;
