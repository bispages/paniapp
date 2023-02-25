import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { User } from '../../types';

type AppStateType = {
  loading: boolean;
  onBoarded: boolean;
  user: User | null;
  login: boolean;
};

const initialState: AppStateType = {
  loading: false,
  user: null,
  onBoarded: false,
  login: false,
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
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.login = action.payload;
    },
    logInUser: (state, action: PayloadAction<User>) => {
      state.login = true;
      state.user = action.payload;
    },
    logOutUser: (state, action: PayloadAction<void>) => {
      state.login = false;
      state.user = null;
    },
    resetAppState: () => {
      return initialState;
    },
  },
});

export const { saveUser, setIsOnBoarded, setIsLoggedIn, logInUser, logOutUser, resetAppState } = appStateSlice.actions;

export const selectAppState = (state: RootState) => state.appState;

export const appStateReducer = appStateSlice.reducer;
