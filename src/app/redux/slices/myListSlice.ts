import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieDetails } from '../../types';

interface MyListState {
  items: MovieDetails[];
}

const loadMyList = (): MovieDetails[] => {
  if (typeof window !== 'undefined') {
    try {
      const savedList = localStorage.getItem('myList');
      if (savedList) {
        const movies = JSON.parse(savedList);
        
        const uniqueMovies: Record<string, MovieDetails> = {};
        movies.forEach((movie: MovieDetails) => {
          if (movie && typeof movie === 'object' && 'imdbID' in movie) {
            uniqueMovies[movie.imdbID] = movie;
          }
        });
        
        return Object.values(uniqueMovies).sort((a, b) => 
          a.Title.localeCompare(b.Title)
        );
      }
    } catch (error) {
      console.error('Failed to load my list from localStorage', error);
    }
  }
  return [];
};

const initialState: MyListState = {
  items: loadMyList(),
};

const saveMyList = (movies: MovieDetails[]) => {
  if (typeof window !== 'undefined') {
    try {
      const sortedMovies = [...movies].sort((a, b) => 
        a.Title.localeCompare(b.Title)
      );
      localStorage.setItem('myList', JSON.stringify(sortedMovies));
    } catch (error) {
      console.error('Failed to save my list to localStorage', error);
    }
  }
};

const myListSlice = createSlice({
  name: 'myList',
  initialState,
  reducers: {
    addToList: (state, action: PayloadAction<MovieDetails>) => {
      const exists = state.items.some(movie => movie.imdbID === action.payload.imdbID);
      if (!exists) {
        state.items.push(action.payload);
        saveMyList(state.items);
      }
    },
    removeFromList: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(movie => movie.imdbID !== action.payload);
      saveMyList(state.items);
    },
    setMyList: (state, action: PayloadAction<MovieDetails[]>) => {
      state.items = action.payload;
      saveMyList(state.items);
    }
  },
});

export const { addToList, removeFromList, setMyList } = myListSlice.actions;
export default myListSlice.reducer;
