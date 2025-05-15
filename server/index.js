import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import announcementsRoutes from './routes/announcements.js';
import quizzesRoutes from './routes/quizzes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/announcements', announcementsRoutes);
app.use('/api/quizzes', quizzesRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Student Dashboard API is running');
});

// MongoDB connection (using in-memory MongoDB for demo)
mongoose.connect('mongodb://localhost:27017/student-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  
  // Seed data if database is empty
  seedDatabase();
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  
  // Fallback to mock data if MongoDB can't connect
  useMockData();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Seed database with initial data
const seedDatabase = async () => {
  try {
    const Announcement = mongoose.model('Announcement');
    const Quiz = mongoose.model('Quiz');
    
    const announcementsCount = await Announcement.countDocuments();
    const quizzesCount = await Quiz.countDocuments();
    
    if (announcementsCount === 0) {
      const sampleAnnouncements = [
        {
          title: 'Welcome to Spring Semester',
          content: 'Welcome to the Spring Semester 2025! We hope you are excited about your classes. Please check your schedule and make sure you have all required materials.',
          author: 'Dean Johnson',
          date: new Date('2025-01-15'),
        },
        {
          title: 'Library Hours Extended',
          content: 'The university library will extend its opening hours during the final exam period. Starting next week, the library will be open 24/7.',
          author: 'Library Services',
          date: new Date('2025-02-10'),
        },
        {
          title: 'Campus Career Fair',
          content: 'Don\'t miss the Spring Career Fair on March 15. Many top companies will be present to recruit students for internships and full-time positions.',
          author: 'Career Services',
          date: new Date('2025-03-01'),
        },
      ];
      
      await Announcement.insertMany(sampleAnnouncements);
      console.log('Sample announcements inserted');
    }
    
    if (quizzesCount === 0) {
      const sampleQuizzes = [
        {
          title: 'Midterm Review Quiz',
          description: 'This quiz covers all material from weeks 1-5. It will help you prepare for the upcoming midterm exam.',
          dueDate: new Date('2025-03-10'),
          totalPoints: 50,
          questions: 20,
          course: 'Introduction to Computer Science',
        },
        {
          title: 'Chapter 7 Assessment',
          description: 'Assessment covering Chapter 7: Database Normalization. Focus on 1NF, 2NF, and 3NF concepts.',
          dueDate: new Date('2025-03-15'),
          totalPoints: 30,
          questions: 15,
          course: 'Database Management',
        },
        {
          title: 'Final Project Proposal',
          description: 'Submit your group project proposal including team members, project outline, and timeline.',
          dueDate: new Date('2025-03-20'),
          totalPoints: 100,
          questions: 5,
          course: 'Web Development',
        },
      ];
      
      await Quiz.insertMany(sampleQuizzes);
      console.log('Sample quizzes inserted');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Use mock data if MongoDB is not available
const useMockData = () => {
  console.log('Using mock data');
  
  // Mock data handling will be implemented in routes
  app.locals.useMockData = true;
  
  // Create mock data
  app.locals.mockAnnouncements = [
    {
      _id: '1',
      title: 'Welcome to Spring Semester',
      content: 'Welcome to the Spring Semester 2025! We hope you are excited about your classes. Please check your schedule and make sure you have all required materials.',
      author: 'Dean Johnson',
      date: new Date('2025-01-15').toISOString(),
    },
    {
      _id: '2',
      title: 'Library Hours Extended',
      content: 'The university library will extend its opening hours during the final exam period. Starting next week, the library will be open 24/7.',
      author: 'Library Services',
      date: new Date('2025-02-10').toISOString(),
    },
    {
      _id: '3',
      title: 'Campus Career Fair',
      content: 'Don\'t miss the Spring Career Fair on March 15. Many top companies will be present to recruit students for internships and full-time positions.',
      author: 'Career Services',
      date: new Date('2025-03-01').toISOString(),
    },
  ];
  
  app.locals.mockQuizzes = [
    {
      _id: '1',
      title: 'Midterm Review Quiz',
      description: 'This quiz covers all material from weeks 1-5. It will help you prepare for the upcoming midterm exam.',
      dueDate: new Date('2025-03-10').toISOString(),
      totalPoints: 50,
      questions: 20,
      course: 'Introduction to Computer Science',
    },
    {
      _id: '2',
      title: 'Chapter 7 Assessment',
      description: 'Assessment covering Chapter 7: Database Normalization. Focus on 1NF, 2NF, and 3NF concepts.',
      dueDate: new Date('2025-03-15').toISOString(),
      totalPoints: 30,
      questions: 15,
      course: 'Database Management',
    },
    {
      _id: '3',
      title: 'Final Project Proposal',
      description: 'Submit your group project proposal including team members, project outline, and timeline.',
      dueDate: new Date('2025-03-20').toISOString(),
      totalPoints: 100,
      questions: 5,
      course: 'Web Development',
    },
  ];
};