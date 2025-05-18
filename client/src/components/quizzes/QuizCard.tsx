import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import { format } from 'date-fns';
import { differenceInDays } from 'date-fns';

import { Quiz } from '../../store/slices/quizzesSlice';

interface QuizCardProps {
  quiz: Quiz;
  onEdit: (quiz: Quiz) => void;
  onDelete: (id: string) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onEdit, onDelete }) => {
  const { t } = useTranslation();
  const { _id, title, description, dueDate, totalPoints, questions, course } = quiz;
  
  const daysRemaining = differenceInDays(new Date(dueDate), new Date());
  
  return (
    <Card 
      sx={{ 
        mb: 2, 
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Chip 
            label={course} 
            size="small" 
            color="secondary" 
            sx={{ fontWeight: 'medium' }}
          />
        </Box>
        
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 2,
            flexWrap: 'wrap'
          }}
        >
          <Chip 
            label={`${t('quizzes.dueDate')}: ${format(new Date(dueDate), 'MMM d, yyyy')}`} 
            size="small" 
            color={daysRemaining < 3 ? "error" : "default"}
            variant="outlined"
          />
          <Chip 
            label={`${t('quizzes.questions')}: ${questions}`} 
            size="small" 
            variant="outlined"
          />
          <Chip 
            label={`${t('quizzes.points')}: ${totalPoints}`} 
            size="small" 
            variant="outlined"
          />
        </Box>
        
        <Typography variant="body1">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Button 
          variant="contained" 
          size="small" 
          color="primary"
          sx={{
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }
          }}
        >
          {t('quizzes.startQuiz')}
        </Button>
        
        <Box>
          <Tooltip title={t('common.edit')}>
            <IconButton 
              color="primary" 
              onClick={() => onEdit(quiz)}
              sx={{ 
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('common.delete')}>
            <IconButton 
              color="error" 
              onClick={() => onDelete(_id)}
              sx={{ 
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
};

export default QuizCard;