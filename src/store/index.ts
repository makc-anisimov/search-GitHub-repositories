import { configureStore } from '@reduxjs/toolkit';
import reposReducer from './reposSlice';

const store = configureStore({
  reducer: {
    repos: reposReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
