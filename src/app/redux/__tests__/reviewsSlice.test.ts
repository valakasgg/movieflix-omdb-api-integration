import reviewsReducer, { 
  addReview, 
  removeReview, 
  setReviews 
} from '../slices/reviewsSlice';
import { Review } from '@/app/types';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('reviewsSlice', () => {
  let initialState: {
    items: Review[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };

  beforeEach(() => {
    localStorageMock.clear();
    
    initialState = {
      items: [],
      status: 'idle',
      error: null,
    };
  });

  it('should handle initial state', () => {
    expect(reviewsReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
      status: 'idle',
      error: null,
    });
  });

  it('should handle addReview', () => {
    const review: Review = {
      id: '1',
      movieId: 'tt1234567',
      rating: 5,
      comment: 'Great movie!',
      author: 'Test User',
      createdAt: Date.now(),
    };

    const actual = reviewsReducer(initialState, addReview(review));
    
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0]).toEqual(review);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('reviews', expect.any(String));
  });

  it('should handle updating an existing review', () => {
    const existingReview: Review = {
      id: '1',
      movieId: 'tt1234567',
      rating: 4,
      comment: 'Good movie',
      author: 'Test User',
      createdAt: Date.now() - 1000,
    };

    const updatedReview: Review = {
      ...existingReview,
      rating: 5,
      comment: 'Great movie!',
      createdAt: Date.now(),
    };

    const stateWithExistingReview = {
      ...initialState,
      items: [existingReview],
    };

    const actual = reviewsReducer(stateWithExistingReview, addReview(updatedReview));
    
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0]).toEqual(updatedReview);
  });

  it('should handle removeReview', () => {
    const review: Review = {
      id: '1',
      movieId: 'tt1234567',
      rating: 5,
      comment: 'Great movie!',
      author: 'Test User',
      createdAt: Date.now(),
    };

    const stateWithReview = {
      ...initialState,
      items: [review],
    };

    const actual = reviewsReducer(stateWithReview, removeReview('1'));
    
    expect(actual.items).toHaveLength(0);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('reviews', expect.any(String));
  });

  it('should handle setReviews', () => {
    const reviews: Review[] = [
      {
        id: '1',
        movieId: 'tt1234567',
        rating: 5,
        comment: 'Great movie!',
        author: 'Test User',
        createdAt: Date.now(),
      },
      {
        id: '2',
        movieId: 'tt7654321',
        rating: 3,
        comment: 'Average movie',
        author: 'Another User',
        createdAt: Date.now(),
      },
    ];

    const actual = reviewsReducer(initialState, setReviews(reviews));
    
    expect(actual.items).toEqual(reviews);
    expect(actual.items).toHaveLength(2);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('reviews', expect.any(String));
  });
});
