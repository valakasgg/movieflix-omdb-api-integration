import { configureStore } from '@reduxjs/toolkit';
import reviewsReducer from './slices/reviewsSlice';
import myListReducer from './slices/myListSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      reviews: reviewsReducer,
      myList: myListReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['reviews/addReview'],
        },
      }),
  });
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
