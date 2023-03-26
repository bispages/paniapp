import { RootState } from '../';

// Any selectors can be written here.
export const selectIsLoading = (state: RootState) => state.appState.loading;

export const selectIsOnBoarded = (state: RootState) => state.appState.onBoarded;

export const selectIsLoggedIn = (state: RootState) => state.appState.login;

export const selectUser = (state: RootState) => state.appState.user;

export const selectUserId = (state: RootState) => state.appState.userId;

export const selectUserToken = (state: RootState) => state.appState.accessToken;

export const selectUserPhone = (state: RootState) => state.appState.userPhone;

export const selectUserLanguage = (state: RootState) => state.appState.userLanguage;
