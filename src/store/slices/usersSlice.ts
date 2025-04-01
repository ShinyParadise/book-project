import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DBUser } from '../../models/user';

interface UsersState {
  users: DBUser[];
  currentUser: DBUser | null;
  loading: boolean;
  error: string | null;
  selectedUser: DBUser | null;
}

const initialState: UsersState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  selectedUser: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<DBUser[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<DBUser>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<DBUser>) => {
      const index = state.users.findIndex(user => user._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user._id !== action.payload);
    },
    setCurrentUser: (state, action: PayloadAction<DBUser | null>) => {
      state.currentUser = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<DBUser | null>) => {
      state.selectedUser = action.payload;
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
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  setCurrentUser,
  setSelectedUser,
  setLoading,
  setError,
} = usersSlice.actions;

export default usersSlice.reducer; 