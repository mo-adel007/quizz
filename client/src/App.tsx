import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import QuizzesPage from './pages/QuizzesPage';
import NotFoundPage from './pages/NotFoundPage';
import { RootState } from './store';
import RequireAuth from './components/auth/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/dashboard" 
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        } 
      />
      <Route 
        path="/announcements" 
        element={
          <RequireAuth>
            <AnnouncementsPage />
          </RequireAuth>
        } 
      />
      <Route 
        path="/quizzes" 
        element={
          <RequireAuth>
            <QuizzesPage />
          </RequireAuth>
        } 
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;