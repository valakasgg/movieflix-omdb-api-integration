'use client';

import useSWR from 'swr';
import { searchMovies, getMovieDetails } from '../lib/omdb';
import { SearchParams, SearchResponse, MovieDetails } from '../types';

const searchFetcher = async (url: string, params: SearchParams) => {
  return await searchMovies(params);
};

const detailsFetcher = async (url: string, id: string) => {
  return await getMovieDetails(id);
};

export function useMovieSearch(params: SearchParams | null) {
  const { data, error, isLoading } = useSWR(
    params ? ['/api/search', params] : null,
    ([url, p]) => searchFetcher(url, p),
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000,
    }
  );

  return {
    movies: data as SearchResponse,
    isLoading,
    isError: !!error,
    error
  };
}

export function useMovieDetails(id: string | null) {
  const { data, error, isLoading } = useSWR(
    id ? ['/api/movie', id] : null,
    ([url, movieId]) => detailsFetcher(url, movieId),
    {
      revalidateOnFocus: false,
      dedupingInterval: 3600000,
    }
  );

  return {
    movie: data as MovieDetails,
    isLoading,
    isError: !!error,
    error
  };
}