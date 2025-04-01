import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/booksSlice';
import chaptersReducer from './slices/chaptersSlice';
import commentsReducer from './slices/commentsSlice';
import ratingsReducer from './slices/ratingsSlice';
import reportsReducer from './slices/reportsSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    chapters: chaptersReducer,
    comments: commentsReducer,
    ratings: ratingsReducer,
    reports: reportsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 