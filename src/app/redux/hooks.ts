import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectReviewsByMovieId = (movieId: string) => 
  createSelector(
    (state: RootState) => state.reviews.items,
    (reviews) => reviews.filter(review => review.movieId === movieId)
  );

export const selectIsInMyList = (movieId: string) => 
  createSelector(
    (state: RootState) => state.myList.items,
    (items) => items.some(item => item.imdbID === movieId)
  );

export const selectMyListCount = createSelector(
  (state: RootState) => state.myList.items,
  (items) => items.length
);
