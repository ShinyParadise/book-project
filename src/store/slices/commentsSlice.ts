import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DBComment } from '../../models/comment';

interface CommentsState {
  comments: DBComment[];
  loading: boolean;
  error: string | null;
  selectedComment: DBComment | null;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
  selectedComment: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<DBComment[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<DBComment>) => {
      state.comments.push(action.payload);
    },
    updateComment: (state, action: PayloadAction<DBComment>) => {
      const index = state.comments.findIndex(comment => comment._id === action.payload._id);
      if (index !== -1) {
        state.comments[index] = action.payload;
      }
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter(comment => comment._id !== action.payload);
    },
    setSelectedComment: (state, action: PayloadAction<DBComment | null>) => {
      state.selectedComment = action.payload;
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
  setComments,
  addComment,
  updateComment,
  deleteComment,
  setSelectedComment,
  setLoading,
  setError,
} = commentsSlice.actions;

export default commentsSlice.reducer; 