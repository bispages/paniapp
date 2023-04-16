import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { User } from '../../types';
import { LANGUAGES } from 'utils/constants';

type AppStateType = {
  loading: boolean;
  onBoarded: boolean;
  user: User | null;
  login: boolean;
  userId: string;
  accessToken: string;
  userPhone: string;
  userLanguage: null | LANGUAGES;
};

const initialState: AppStateType = {
  loading: false,
  user: null,
  onBoarded: false,
  login: false,
  userId: '',
  accessToken: '',
  userPhone: '',
  userLanguage: null,
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
    logOutUser: state => {
      state.login = false;
      state.user = null;
      state.userId = '';
      state.accessToken = '';
      state.userPhone = '';
    },
    setLanguage: (state, action: PayloadAction<number>) => {
      state.userLanguage = action.payload;
    },
    resetAppState: () => {
      return initialState;
    },
  },
});

export const { saveUser, setIsOnBoarded, logInUser, logOutUser, setLanguage, resetAppState } = appStateSlice.actions;

export const selectAppState = (state: RootState) => state.appState;

export const appStateReducer = appStateSlice.reducer;
