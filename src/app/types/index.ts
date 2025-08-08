export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails extends Movie {
  Plot: string;
  Director: string;
  Actors: string;
  Released: string;
  Runtime: string;
  Genre: string;
  imdbRating: string;
  Rated?: string;
  Awards?: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface Review {
  id: string;
  movieId: string;
  rating: number;
  comment: string;
  author: string;
  createdAt: number;
}

export interface SearchParams {
  s: string;
  page?: number;
  type?: 'movie' | 'series' | 'episode';
  year?: number;
}