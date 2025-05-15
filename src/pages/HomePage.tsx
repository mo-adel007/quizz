import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SchoolIcon from '@mui/icons-material/School';

import AuthButton from '../components/auth/AuthButton';
import LanguageSelector from '../components/common/LanguageSelector';
import { RootState } from '../store';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
      }}
    >
      <Box 
        component="header" 
        sx={{ 
          py: 2, 
          px: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <SchoolIcon color="primary" />
          {t('app.title')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LanguageSelector />
          <AuthButton />
        </Box>
      </Box>

      <Box 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: { xs: 4, md: 0 } }}>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'primary.main',
                    animation: 'fadeIn 1s ease-in',
                    '@keyframes fadeIn': {
                      '0%': { opacity: 0, transform: 'translateY(-20px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' },
                    },
                  }}
                >
                  {t('auth.welcome')}
                </Typography>
                <Typography 
                  variant="h6" 
                  color="text.secondary" 
                  paragraph
                  sx={{ 
                    maxWidth: 400,
                    mb: 4,
                    animation: 'fadeIn 1s ease-in .3s forwards',
                    opacity: 0,
                    '@keyframes fadeIn': {
                      '0%': { opacity: 0, transform: 'translateY(-10px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' },
                    },
                  }}
                >
                  {t('auth.description')}
                </Typography>
                <Box 
                  sx={{ 
                    animation: 'fadeIn 1s ease-in .6s forwards',
                    opacity: 0,
                    '@keyframes fadeIn': {
                      '0%': { opacity: 0 },
                      '100%': { opacity: 1 },
                    },
                  }}
                >
                  <Typography variant="body1" paragraph>
                    {t('auth.loginPrompt')}
                  </Typography>
                  <AuthButton />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  borderRadius: 4,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: 'slideIn 1s ease-out',
                  '@keyframes slideIn': {
                    '0%': { opacity: 0, transform: 'translateX(50px)' },
                    '100%': { opacity: 1, transform: 'translateX(0)' },
                  },
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <SchoolIcon sx={{ fontSize: 60, mb: 2 }} />
                  <Typography variant="h4" component="h2" gutterBottom>
                    {t('app.tagline')}
                  </Typography>
                  <Typography variant="body1">
                    • {t('dashboard.menu.dashboard')}
                  </Typography>
                  <Typography variant="body1">
                    • {t('dashboard.menu.announcements')}
                  </Typography>
                  <Typography variant="body1">
                    • {t('dashboard.menu.quizzes')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -30,
                    left: -30,
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;