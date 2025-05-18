import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

import DashboardLayout from '../components/layout/DashboardLayout';
import QuizCard from '../components/quizzes/QuizCard';
import QuizForm from '../components/quizzes/QuizForm';
import { AppDispatch, RootState } from '../store';
import { 
  fetchQuizzes, 
  createQuiz, 
  updateQuiz, 
  deleteQuiz,
  Quiz
} from '../store/slices/quizzesSlice';

const QuizzesPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { quizzes, loading, error } = useSelector((state: RootState) => state.quizzes);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | undefined>(undefined);
  
  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.course.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAdd = () => {
    setSelectedQuiz(undefined);
    setIsDialogOpen(true);
  };
  
  const handleEdit = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setIsDialogOpen(true);
  };
  
  const handleDelete = (id: string) => {
    if (confirm(t('quizzes.deleteConfirm'))) {
      dispatch(deleteQuiz(id));
    }
  };
  
  const handleSubmit = (quiz: Omit<Quiz, '_id'> | Quiz) => {
    if ('_id' in quiz) {
      dispatch(updateQuiz(quiz as Quiz));
    } else {
      dispatch(createQuiz(quiz));
    }
  };
  
  return (
    <DashboardLayout>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          {t('dashboard.menu.quizzes')}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }
          }}
        >
          {t('common.add')}
        </Button>
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder={t('common.search')}
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredQuizzes.length > 0 ? (
        <Grid container spacing={3}>
          {filteredQuizzes.map(quiz => (
            <Grid item xs={12} md={6} lg={4} key={quiz._id}>
              <QuizCard 
                quiz={quiz}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', my: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {t('quizzes.noQuizzes')}
          </Typography>
        </Box>
      )}
      
      <QuizForm 
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        quiz={selectedQuiz}
      />
    </DashboardLayout>
  );
};

export default QuizzesPage;