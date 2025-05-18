# Student Dashboard Application

A modern, responsive student dashboard application built with React, TypeScript, and Material-UI. This application helps students manage their academic activities by providing access to announcements, quizzes, and other educational resources.

## Features

- **Authentication System**
  - Simple login/logout functionality
  - Protected routes using Higher Order Components (HOC)
  - Redirect unauthorized users to home page

- **Responsive Design**
  - Mobile-first approach
  - Adaptive layout for all screen sizes
  - Collapsible sidebar navigation for mobile devices

- **Dashboard Features**
  - Overview of upcoming quizzes
  - Recent announcements
  - Exam tips and motivational quotes
  - Quick access to important academic resources

- **Internationalization**
  - Multi-language support using i18next
  - Currently supports English, Spanish, and French
  - Easy to add new languages

- **State Management**
  - Centralized state management using Redux Toolkit
  - Async operations with Redux Thunk
  - Type-safe actions and reducers

- **Backend Integration**
  - RESTful API integration
  - Mock data support for development
  - CRUD operations for announcements and quizzes

## Tech Stack

### Frontend
- React 18
- TypeScript
- Material-UI
- Redux Toolkit
- React Router DOM
- i18next
- Lucide React Icons
- Tailwind CSS

### Backend
- Express.js
- MongoDB (mock data in development)
- Mongoose
- CORS


## Component Architecture

- **DashboardLayout**: Main layout component with responsive sidebar
- **AnnouncementCard/Form**: Reusable components for announcements
- **QuizCard/Form**: Reusable components for quizzes
- **AuthButton**: Handles authentication state
- **LanguageSelector**: Manages language switching
- **StatCard**: Reusable statistics display component

## Styling

- Custom Material-UI theme
- Consistent color palette
- Responsive typography
- Custom component styling
- Animation effects
- Hover states

## API Endpoints

### Announcements
- GET `/api/announcements` - Get all announcements
- GET `/api/announcements/:id` - Get specific announcement
- POST `/api/announcements` - Create new announcement
- PUT `/api/announcements/:id` - Update announcement
- DELETE `/api/announcements/:id` - Delete announcement

### Quizzes
- GET `/api/quizzes` - Get all quizzes
- GET `/api/quizzes/:id` - Get specific quiz
- POST `/api/quizzes` - Create new quiz
- PUT `/api/quizzes/:id` - Update quiz
- DELETE `/api/quizzes/:id` - Delete quiz

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev:all
   ```

## Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write clean, maintainable code
- Follow Material-UI design patterns
- Ensure responsive design
- Maintain type safety

## Testing

- Unit tests for components
- Integration tests for API calls
- Test utilities and helpers
- Mock service workers for API testing

## Future Improvements

- Add real authentication system
- Implement more interactive features
- Add more detailed student statistics
- Enhance quiz taking experience
- Add file upload capabilities
- Implement real-time notifications