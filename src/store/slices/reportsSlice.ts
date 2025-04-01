import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DBUserReport, DBBookReport } from '../../models/report';

interface ReportsState {
  userReports: DBUserReport[];
  bookReports: DBBookReport[];
  loading: boolean;
  error: string | null;
  selectedReport: DBUserReport | DBBookReport | null;
}

const initialState: ReportsState = {
  userReports: [],
  bookReports: [],
  loading: false,
  error: null,
  selectedReport: null,
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setUserReports: (state, action: PayloadAction<DBUserReport[]>) => {
      state.userReports = action.payload;
    },
    setBookReports: (state, action: PayloadAction<DBBookReport[]>) => {
      state.bookReports = action.payload;
    },
    addUserReport: (state, action: PayloadAction<DBUserReport>) => {
      state.userReports.push(action.payload);
    },
    addBookReport: (state, action: PayloadAction<DBBookReport>) => {
      state.bookReports.push(action.payload);
    },
    updateUserReport: (state, action: PayloadAction<DBUserReport>) => {
      const index = state.userReports.findIndex(report => report._id === action.payload._id);
      if (index !== -1) {
        state.userReports[index] = action.payload;
      }
    },
    updateBookReport: (state, action: PayloadAction<DBBookReport>) => {
      const index = state.bookReports.findIndex(report => report._id === action.payload._id);
      if (index !== -1) {
        state.bookReports[index] = action.payload;
      }
    },
    deleteUserReport: (state, action: PayloadAction<string>) => {
      state.userReports = state.userReports.filter(report => report._id !== action.payload);
    },
    deleteBookReport: (state, action: PayloadAction<string>) => {
      state.bookReports = state.bookReports.filter(report => report._id !== action.payload);
    },
    setSelectedReport: (state, action: PayloadAction<DBUserReport | DBBookReport | null>) => {
      state.selectedReport = action.payload;
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
  setUserReports,
  setBookReports,
  addUserReport,
  addBookReport,
  updateUserReport,
  updateBookReport,
  deleteUserReport,
  deleteBookReport,
  setSelectedReport,
  setLoading,
  setError,
} = reportsSlice.actions;

export default reportsSlice.reducer; 