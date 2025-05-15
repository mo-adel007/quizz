import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import { Quiz } from '../../store/slices/quizzesSlice';

interface QuizFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (quiz: Omit<Quiz, '_id'> | Quiz) => void;
  quiz?: Quiz;
}

const initialState = {
  title: '',
  description: '',
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // One week from now
  totalPoints: 100,
  questions: 10,
  course: '',
};

const QuizForm: React.FC<QuizFormProps> = ({ open, onClose, onSubmit, quiz }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    dueDate: false,
    totalPoints: false,
    questions: false,
    course: false,
  });

  useEffect(() => {
    if (quiz) {
      const formattedDate = new Date(quiz.dueDate).toISOString().split('T')[0];
      setFormData({
        ...quiz,
        dueDate: formattedDate,
      });
    } else {
      setFormData(initialState);
    }
  }, [quiz, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'totalPoints' || name === 'questions' 
        ? parseInt(value, 10) || 0 
        : value,
    });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: false,
      });
    }
  };

  const handleSubmit = () => {
    // Validate form
    const newErrors = {
      title: !formData.title,
      description: !formData.description,
      dueDate: !formData.dueDate,
      totalPoints: formData.totalPoints <= 0,
      questions: formData.questions <= 0,
      course: !formData.course,
    };
    
    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors);
      return;
    }
    
    // Submit valid form
    onSubmit(quiz ? { ...formData, _id: quiz._id } : formData);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {quiz 
          ? t('quizzes.editQuiz') 
          : t('quizzes.newQuiz')
        }
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            name="title"
            label={t('quizzes.title')}
            fullWidth
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            helperText={errors.title ? t('common.fieldRequired') : ''}
          />
          <TextField
            name="course"
            label={t('quizzes.course')}
            fullWidth
            value={formData.course}
            onChange={handleChange}
            error={errors.course}
            helperText={errors.course ? t('common.fieldRequired') : ''}
          />
          <TextField
            name="description"
            label={t('quizzes.description')}
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
            helperText={errors.description ? t('common.fieldRequired') : ''}
          />
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                name="dueDate"
                label={t('quizzes.dueDate')}
                type="date"
                fullWidth
                value={formData.dueDate}
                onChange={handleChange}
                error={errors.dueDate}
                helperText={errors.dueDate ? t('common.fieldRequired') : ''}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="totalPoints"
                label={t('quizzes.totalPoints')}
                type="number"
                fullWidth
                value={formData.totalPoints}
                onChange={handleChange}
                error={errors.totalPoints}
                helperText={errors.totalPoints ? t('quizzes.positiveNumber') : ''}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="questions"
                label={t('quizzes.questions')}
                type="number"
                fullWidth
                value={formData.questions}
                onChange={handleChange}
                error={errors.questions}
                helperText={errors.questions ? t('quizzes.positiveNumber') : ''}
                inputProps={{ min: 1 }}
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>{t('common.cancel')}</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
        >
          {t('common.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuizForm;