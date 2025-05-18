import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import announcementsReducer from './slices/announcementsSlice';
import quizzesReducer from './slices/quizzesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    announcements: announcementsReducer,
    quizzes: quizzesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;