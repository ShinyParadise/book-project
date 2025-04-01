import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DBChapter } from '../../models/chapter';

interface ChaptersState {
  chapters: DBChapter[];
  loading: boolean;
  error: string | null;
  selectedChapter: DBChapter | null;
}

const initialState: ChaptersState = {
  chapters: [],
  loading: false,
  error: null,
  selectedChapter: null,
};

const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    setChapters: (state, action: PayloadAction<DBChapter[]>) => {
      state.chapters = action.payload;
    },
    addChapter: (state, action: PayloadAction<DBChapter>) => {
      state.chapters.push(action.payload);
    },
    updateChapter: (state, action: PayloadAction<DBChapter>) => {
      const index = state.chapters.findIndex(chapter => chapter._id === action.payload._id);
      if (index !== -1) {
        state.chapters[index] = action.payload;
      }
    },
    deleteChapter: (state, action: PayloadAction<string>) => {
      state.chapters = state.chapters.filter(chapter => chapter._id !== action.payload);
    },
    setSelectedChapter: (state, action: PayloadAction<DBChapter | null>) => {
      state.selectedChapter = action.payload;
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
  setChapters,
  addChapter,
  updateChapter,
  deleteChapter,
  setSelectedChapter,
  setLoading,
  setError,
} = chaptersSlice.actions;

export default chaptersSlice.reducer; 