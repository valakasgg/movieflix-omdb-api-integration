import myListReducer, { addToList, removeFromList, setMyList } from '../myListSlice';
import { MovieDetails } from '@/app/types';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('myListSlice', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  const mockMovie1: MovieDetails = {
    imdbID: 'tt1234567',
    Title: 'Test Movie 1',
    Year: '2023',
    Poster: '/test-poster-1.jpg',
    Type: 'movie',
    Plot: 'Test plot 1',
    Director: 'Director 1',
    Actors: 'Actor 1, Actor 2',
    Genre: 'Drama',
    Runtime: '120 min',
    imdbRating: '8.5',
    Released: '2023-01-01',
  };

  const mockMovie2: MovieDetails = {
    imdbID: 'tt7654321',
    Title: 'Test Movie 2',
    Year: '2022',
    Poster: '/test-poster-2.jpg',
    Type: 'movie',
    Plot: 'Test plot 2',
    Director: 'Director 2',
    Actors: 'Actor 3, Actor 4',
    Genre: 'Action',
    Runtime: '110 min',
    imdbRating: '7.8',
    Released: '2022-05-15',
  };

  it('should return the initial state', () => {
    expect(myListReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      items: [],
    });
  });

  it('should handle adding a movie to the list', () => {
    const initialState = { items: [] };
    const nextState = myListReducer(initialState, addToList(mockMovie1));
    
    expect(nextState.items.length).toBe(1);
    expect(nextState.items[0]).toEqual(mockMovie1);
    
    const savedList = JSON.parse(localStorageMock.getItem('myList') || '[]');
    expect(savedList.length).toBe(1);
    expect(savedList[0].imdbID).toBe(mockMovie1.imdbID);
  });

  it('should not add duplicate movies to the list', () => {
    const initialState = { items: [mockMovie1] };
    const nextState = myListReducer(initialState, addToList(mockMovie1));
    
    expect(nextState.items.length).toBe(1);
    expect(nextState.items[0]).toEqual(mockMovie1);
  });

  it('should handle removing a movie from the list', () => {
    const initialState = { items: [mockMovie1, mockMovie2] };
    const nextState = myListReducer(initialState, removeFromList(mockMovie1.imdbID));
    
    expect(nextState.items.length).toBe(1);
    expect(nextState.items[0]).toEqual(mockMovie2);
    
    const savedList = JSON.parse(localStorageMock.getItem('myList') || '[]');
    expect(savedList.length).toBe(1);
    expect(savedList[0].imdbID).toBe(mockMovie2.imdbID);
  });

  it('should handle setting the entire list', () => {
    const initialState = { items: [] };
    const movies = [mockMovie1, mockMovie2];
    const nextState = myListReducer(initialState, setMyList(movies));
    
    expect(nextState.items.length).toBe(2);
    expect(nextState.items).toEqual(expect.arrayContaining([mockMovie1, mockMovie2]));
    
    const savedList = JSON.parse(localStorageMock.getItem('myList') || '[]');
    expect(savedList.length).toBe(2);
  });

  it('should load the initial state from localStorage', () => {
    const movies = [mockMovie1, mockMovie2];
    localStorageMock.setItem('myList', JSON.stringify(movies));
    
    jest.resetModules();
    const freshModule = require('../myListSlice');
    
    const initialState = freshModule.default(undefined, { type: undefined });
    expect(initialState.items.length).toBe(2);
  });
});
