import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DBBook, BookCreate, BookUpdate } from '../../models/book';

interface BooksState {
  books: DBBook[];
  loading: boolean;
  error: string | null;
  selectedBook: DBBook | null;
}

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
  selectedBook: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<DBBook[]>) => {
      state.books = action.payload;
    },
    addBook: (state, action: PayloadAction<DBBook>) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action: PayloadAction<DBBook>) => {
      const index = state.books.findIndex(book => book._id === action.payload._id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(book => book._id !== action.payload);
    },
    setSelectedBook: (state, action: PayloadAction<DBBook | null>) => {
      state.selectedBook = action.payload;
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
  setBooks,
  addBook,
  updateBook,
  deleteBook,
  setSelectedBook,
  setLoading,
  setError,
} = booksSlice.actions;

export default booksSlice.reducer; 