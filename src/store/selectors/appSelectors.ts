import { RootState } from '../';

// Any selectors can be written here.
export const selectIsOnBoarded = (state: RootState) => state.appState.onBoarded;

export const selectIsLoggedIn = (state: RootState) => state.appState.login;

export const selectUser = (state: RootState) => state.appState.user;
