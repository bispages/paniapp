import { configureStore } from '@reduxjs/toolkit';
import { ApiSlice } from './slices/ApiSlice';
import { appStateReducer } from './slices/AppStateSlice';
import { estimateStateReducer } from './slices/EstimateStateSlice';

const middlewares: any = [];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    estimateState: estimateStateReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(ApiSlice.middleware, middlewares),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
