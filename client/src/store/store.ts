import { configureStore } from '@reduxjs/toolkit';
import managerReducer from '../features/managerSlice';

export const store = configureStore({
  reducer: {
    manager: managerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
