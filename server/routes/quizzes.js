import express from 'express';
import mongoose from 'mongoose';
import Quiz from '../models/quiz.js';

const router = express.Router();

// Handle both real MongoDB and mock data
const getQuizzes = async (req, res) => {
  try {
    if (req.app.locals.useMockData) {
      return res.status(200).json(req.app.locals.mockQuizzes);
    }
    
    const quizzes = await Quiz.find().sort({ dueDate: 1 });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (req.app.locals.useMockData) {
      const quiz = req.app.locals.mockQuizzes.find(q => q._id === id);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      return res.status(200).json(quiz);
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createQuiz = async (req, res) => {
  try {
    const { title, description, dueDate, totalPoints, questions, course } = req.body;
    
    if (!title || !description || !dueDate || !totalPoints || !questions || !course) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (req.app.locals.useMockData) {
      const newQuiz = {
        _id: (req.app.locals.mockQuizzes.length + 1).toString(),
        title,
        description,
        dueDate,
        totalPoints,
        questions,
        course,
      };
      
      req.app.locals.mockQuizzes.push(newQuiz);
      return res.status(201).json(newQuiz);
    }
    
    const newQuiz = new Quiz({
      title,
      description,
      dueDate,
      totalPoints,
      questions,
      course,
    });
    
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, totalPoints, questions, course } = req.body;
    
    if (!title || !description || !dueDate || !totalPoints || !questions || !course) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (req.app.locals.useMockData) {
      const index = req.app.locals.mockQuizzes.findIndex(q => q._id === id);
      if (index === -1) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      
      const updatedQuiz = {
        ...req.app.locals.mockQuizzes[index],
        title,
        description,
        dueDate,
        totalPoints,
        questions,
        course,
      };
      
      req.app.locals.mockQuizzes[index] = updatedQuiz;
      return res.status(200).json(updatedQuiz);
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { title, description, dueDate, totalPoints, questions, course },
      { new: true }
    );
    
    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    res.status(200).json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (req.app.locals.useMockData) {
      const index = req.app.locals.mockQuizzes.findIndex(q => q._id === id);
      if (index === -1) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      
      req.app.locals.mockQuizzes.splice(index, 1);
      return res.status(200).json({ message: 'Quiz deleted successfully' });
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Routes
router.get('/', getQuizzes);
router.get('/:id', getQuiz);
router.post('/', createQuiz);
router.put('/:id', updateQuiz);
router.delete('/:id', deleteQuiz);

export default router;