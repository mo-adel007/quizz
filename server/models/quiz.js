import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  totalPoints: {
    type: Number,
    required: true,
    min: 1,
  },
  questions: {
    type: Number,
    required: true,
    min: 1,
  },
  course: {
    type: String,
    required: true,
    trim: true,
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;