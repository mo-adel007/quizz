import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { format, isAfter, isBefore, addDays } from 'date-fns';

import { RootState } from '../../store';
import { Quiz } from '../../store/slices/quizzesSlice';

const UpcomingQuizzes: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: RootState) => state.quizzes);
  
  // Get quizzes due within the next 7 days
  const today = new Date();
  const nextWeek = addDays(today, 7);
  
  const upcomingQuizzes = quizzes
    .filter(quiz => 
      isAfter(new Date(quiz.dueDate), today) && 
      isBefore(new Date(quiz.dueDate), nextWeek)
    )
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography variant="h6" component="h2">
            {t('dashboard.upcomingQuizzes')}
          </Typography>
          <Button 
            size="small" 
            onClick={() => navigate('/quizzes')}
            sx={{ textTransform: 'none' }}
          >
            {t('common.viewAll')}
          </Button>
        </Box>
        
        {upcomingQuizzes.length > 0 ? (
          <List disablePadding>
            {upcomingQuizzes.map((quiz, index) => (
              <React.Fragment key={quiz._id}>
                {index > 0 && <Divider component="li" />}
                <ListItem 
                  alignItems="flex-start"
                  sx={{ 
                    px: 0,
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" component="span">
                          {quiz.title}
                        </Typography>
                        <Chip 
                          label={`${quiz.totalPoints} ${t('quizzes.points')}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'block' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {quiz.course}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {t('quizzes.due')}: {format(new Date(quiz.dueDate), 'MMM d, yyyy')}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              {t('dashboard.noUpcomingQuizzes')}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingQuizzes;