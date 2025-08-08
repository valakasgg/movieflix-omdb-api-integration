import { MovieDetails, SearchParams, SearchResponse } from "../types";

const API_URL = "https://www.omdbapi.com/";

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || "6686b6aa";

export async function searchMovies({ s, page = 1, type, year }: SearchParams): Promise<SearchResponse> {
  const params = new URLSearchParams({
    apikey: API_KEY,
    s: encodeURIComponent(s),
    page: page.toString(),
  });
  
  if (type) params.append('type', type);
  if (year) params.append('y', year.toString());
  
  const response = await fetch(`${API_URL}?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (data.Response === "False") {
    throw new Error(data.Error || "Failed to fetch movies");
  }
  
  return data;
}

export async function getMovieDetails(id: string, plot = "full"): Promise<MovieDetails> {
  const params = new URLSearchParams({
    apikey: API_KEY,
    i: id,
    plot: plot
  });
  
  const response = await fetch(`${API_URL}?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (data.Response === "False") {
    throw new Error(data.Error || "Failed to fetch movie details");
  }
  
  return data;
}