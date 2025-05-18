import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints: number;
  questions: number;
  course: string;
}

interface QuizzesState {
  quizzes: Quiz[];
  loading: boolean;
  error: string | null;
}

const initialState: QuizzesState = {
  quizzes: [],
  loading: false,
  error: null,
};

export const fetchQuizzes = createAsyncThunk(
  'quizzes/fetchQuizzes',
  async () => {
    const response = await axios.get('http://localhost:5000/api/quizzes');
    return response.data;
  }
);

export const createQuiz = createAsyncThunk(
  'quizzes/createQuiz',
  async (quiz: Omit<Quiz, '_id'>) => {
    const response = await axios.post('http://localhost:5000/api/quizzes', quiz);
    return response.data;
  }
);

export const updateQuiz = createAsyncThunk(
  'quizzes/updateQuiz',
  async (quiz: Quiz) => {
    const response = await axios.put(`http://localhost:5000/api/quizzes/${quiz._id}`, quiz);
    return response.data;
  }
);

export const deleteQuiz = createAsyncThunk(
  'quizzes/deleteQuiz',
  async (id: string) => {
    await axios.delete(`http://localhost:5000/api/quizzes/${id}`);
    return id;
  }
);

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action: PayloadAction<Quiz[]>) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch quizzes';
      })
      .addCase(createQuiz.fulfilled, (state, action: PayloadAction<Quiz>) => {
        state.quizzes.push(action.payload);
      })
      .addCase(updateQuiz.fulfilled, (state, action: PayloadAction<Quiz>) => {
        const index = state.quizzes.findIndex(q => q._id === action.payload._id);
        if (index !== -1) {
          state.quizzes[index] = action.payload;
        }
      })
      .addCase(deleteQuiz.fulfilled, (state, action: PayloadAction<string>) => {
        state.quizzes = state.quizzes.filter(q => q._id !== action.payload);
      });
  },
});

export default quizzesSlice.reducer;