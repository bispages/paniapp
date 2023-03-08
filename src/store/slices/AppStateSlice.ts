import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { User } from '../../types';

type AppStateType = {
  loading: boolean;
  onBoarded: boolean;
  user: User | null;
  login: boolean;
  userId: string;
  accessToken: string;
  userPhone: string;
};

const initialState: AppStateType = {
  loading: false,
  user: null,
  onBoarded: false,
  login: false,
  userId: '',
  accessToken: '',
  userPhone: '',
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setIsOnBoarded: (state, action: PayloadAction<boolean>) => {
      state.onBoarded = action.payload;
    },
    logInUser: (
      state,
      action: PayloadAction<{
        accessToken: string;
        userPhone: string;
        userId: string;
      }>,
    ) => {
      state.login = true;
      state.userId = action.payload.userId;
      state.accessToken = action.payload.accessToken;
      state.userPhone = action.payload.userPhone;
    },
    logOutUser: (state, action: PayloadAction<void>) => {
      state.login = false;
      state.user = null;
      state.userId = '';
      state.accessToken = '';
      state.userPhone = '';
    },
    resetAppState: () => {
      return initialState;
    },
  },
});

export const { saveUser, setIsOnBoarded, logInUser, logOutUser, resetAppState } = appStateSlice.actions;

export const selectAppState = (state: RootState) => state.appState;

export const appStateReducer = appStateSlice.reducer;
