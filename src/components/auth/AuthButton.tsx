import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

import { login, logout } from '../../store/slices/authSlice';
import { RootState } from '../../store';

const AuthButton: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleAuth = () => {
    if (isAuthenticated) {
      dispatch(logout());
      navigate('/');
    } else {
      dispatch(login());
      navigate('/dashboard');
    }
  };

  return (
    <Button 
      variant="contained" 
      color="primary" 
      onClick={handleAuth}
      sx={{ 
        minWidth: 100,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      {isAuthenticated ? t('auth.logout') : t('auth.login')}
    </Button>
  );
};

export default AuthButton;