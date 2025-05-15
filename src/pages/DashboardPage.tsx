import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import QuizIcon from '@mui/icons-material/Quiz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EqualizerIcon from '@mui/icons-material/Equalizer';

import DashboardLayout from '../components/layout/DashboardLayout';
import StatCard from '../components/dashboard/StatCard';
import UpcomingQuizzes from '../components/dashboard/UpcomingQuizzes';
import RecentAnnouncements from '../components/dashboard/RecentAnnouncements';
import { AppDispatch, RootState } from '../store';
import { fetchQuizzes } from '../store/slices/quizzesSlice';
import { fetchAnnouncements } from '../store/slices/announcementsSlice';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { quizzes } = useSelector((state: RootState) => state.quizzes);
  const { announcements } = useSelector((state: RootState) => state.announcements);
  
  useEffect(() => {
    dispatch(fetchQuizzes());
    dispatch(fetchAnnouncements());
  }, [dispatch]);
  
  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('dashboard.summary')}
        </Typography>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title={t('dashboard.stats.totalQuizzes')}
            value={quizzes.length}
            icon={<QuizIcon fontSize="large" />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title={t('dashboard.stats.completedQuizzes')}
            value={Math.floor(quizzes.length * 0.7)} // Mock data
            icon={<CheckCircleIcon fontSize="large" />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title={t('dashboard.stats.announcements')}
            value={announcements.length}
            icon={<NotificationsIcon fontSize="large" />}
            color="#9c27b0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title={t('dashboard.stats.averageScore')}
            value="85%"
            icon={<EqualizerIcon fontSize="large" />}
            color="#ed6c02"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <UpcomingQuizzes />
        </Grid>
        <Grid item xs={12} md={6}>
          <RecentAnnouncements />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default DashboardPage;