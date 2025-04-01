import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DBRating, BookRating } from '../../models/rating';

interface RatingsState {
  ratings: DBRating[];
  bookRatings: BookRating[];
  loading: boolean;
  error: string | null;
  selectedRating: DBRating | null;
}

const initialState: RatingsState = {
  ratings: [],
  bookRatings: [],
  loading: false,
  error: null,
  selectedRating: null,
};

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    setRatings: (state, action: PayloadAction<DBRating[]>) => {
      state.ratings = action.payload;
    },
    addRating: (state, action: PayloadAction<DBRating>) => {
      state.ratings.push(action.payload);
    },
    updateRating: (state, action: PayloadAction<DBRating>) => {
      const index = state.ratings.findIndex(rating => rating._id === action.payload._id);
      if (index !== -1) {
        state.ratings[index] = action.payload;
      }
    },
    deleteRating: (state, action: PayloadAction<string>) => {
      state.ratings = state.ratings.filter(rating => rating._id !== action.payload);
    },
    setSelectedRating: (state, action: PayloadAction<DBRating | null>) => {
      state.selectedRating = action.payload;
    },
    setBookRatings: (state, action: PayloadAction<BookRating[]>) => {
      state.bookRatings = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setRatings,
  addRating,
  updateRating,
  deleteRating,
  setSelectedRating,
  setBookRatings,
  setLoading,
  setError,
} = ratingsSlice.actions;

export default ratingsSlice.reducer; 