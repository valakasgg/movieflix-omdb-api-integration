import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '../../types';

interface ReviewsState {
  items: Review[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const loadReviews = (): Review[] => {
  if (typeof window !== 'undefined') {
    try {
      const savedReviews = localStorage.getItem('reviews');
      if (savedReviews) {
        const reviews = JSON.parse(savedReviews);
        
        const uniqueReviews: Record<string, Review> = {};
        reviews.forEach((review: Review) => {
          if (review && typeof review === 'object' && 'id' in review) {
            uniqueReviews[review.id] = review;
          }
        });
        
        return Object.values(uniqueReviews).sort((a, b) => b.createdAt - a.createdAt);
      }
    } catch (error) {
      console.error('Failed to load reviews from localStorage', error);
    }
  }
  return [];
};

const initialState: ReviewsState = {
  items: loadReviews(),
  status: 'idle',
  error: null,
};

const saveReviews = (reviews: Review[]) => {
  if (typeof window !== 'undefined') {
    try {
      const sortedReviews = [...reviews].sort((a, b) => b.createdAt - a.createdAt);
      localStorage.setItem('reviews', JSON.stringify(sortedReviews));
    } catch (error) {
      console.error('Failed to save reviews to localStorage', error);
    }
  }
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Review>) => {
      const existingIndex = state.items.findIndex(review => review.id === action.payload.id);
      
      if (existingIndex >= 0) {
        state.items[existingIndex] = action.payload;
      } else {
        state.items.push(action.payload);
      }
      
      saveReviews(state.items);
    },
    removeReview: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(review => review.id !== action.payload);
      
      saveReviews(state.items);
    },
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.items = action.payload;
      saveReviews(state.items);
    }
  },
});

export const { addReview, removeReview, setReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
