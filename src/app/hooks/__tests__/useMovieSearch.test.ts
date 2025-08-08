import { renderHook, waitFor } from '@testing-library/react';
import { useMovieSearch, useMovieDetails } from '../useMovieSearch';
import { searchMovies, getMovieDetails } from '../../lib/omdb';

jest.mock('../../lib/omdb', () => ({
  searchMovies: jest.fn(),
  getMovieDetails: jest.fn(),
}));

jest.mock('swr', () => {
  return {
    __esModule: true,
    default: jest.fn((key, fetcher) => {
      if (!key) return { data: undefined, error: undefined, isLoading: false };
      
      if (key[0] === '/api/search') {
        return {
          data: { Search: [], totalResults: 0 },
          error: undefined,
          isLoading: false,
        };
      }
      
      if (key[0] === '/api/movie') {
        return {
          data: { Title: 'Test Movie', imdbID: 'tt1234567' },
          error: undefined,
          isLoading: false,
        };
      }
      
      return { data: undefined, error: undefined, isLoading: false };
    }),
  };
});

describe('useMovieSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns undefined when params are null', () => {
    const { result } = renderHook(() => useMovieSearch(null));
    
    expect(result.current.movies).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('returns search results when params are provided', async () => {
    const mockSearchResult = {
      Search: [
        { 
          Title: 'Test Movie',
          Year: '2023',
          imdbID: 'tt1234567',
          Type: 'movie',
          Poster: '/test-poster.jpg'
        }
      ],
      totalResults: '1'
    };
    
    (searchMovies as jest.Mock).mockResolvedValue(mockSearchResult);
    
    const { result } = renderHook(() => 
      useMovieSearch({ s: 'test', page: 1 })
    );
    
    expect(result.current.movies).toEqual({ Search: [], totalResults: 0 });
    expect(result.current.isLoading).toBe(false);
  });
});

describe('useMovieDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns undefined when id is null', () => {
    const { result } = renderHook(() => useMovieDetails(null));
    
    expect(result.current.movie).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('returns movie details when id is provided', async () => {
    const mockMovieDetails = {
      Title: 'Test Movie',
      Year: '2023',
      imdbID: 'tt1234567',
      Type: 'movie',
      Poster: '/test-poster.jpg',
      Plot: 'A test movie plot',
      Director: 'Test Director',
      Actors: 'Actor 1, Actor 2',
      Genre: 'Drama',
      Runtime: '120 min',
      imdbRating: '8.5',
    };
    
    (getMovieDetails as jest.Mock).mockResolvedValue(mockMovieDetails);
    
    const { result } = renderHook(() => useMovieDetails('tt1234567'));
    
    expect(result.current.movie).toEqual({ 
      Title: 'Test Movie', 
      imdbID: 'tt1234567' 
    });
    expect(result.current.isLoading).toBe(false);
  });
});
