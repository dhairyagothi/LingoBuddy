import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import LessonDetail from './pages/LessonDetail';
import Quiz from './pages/Quiz';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import LanguagePage from './pages/LanguagePage';
import Leaderboard from './pages/Leaderboard';
import Quests from './pages/Quests';
import Shop from './pages/Shop';
import More from './pages/More';

const App = () => (
  <AppProvider>
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/:id" element={<LessonDetail />} />
          <Route path="/lessons/:languageId" element={<Lessons />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/:languageId" element={<Quiz />} />
          <Route path="/language/:languageId" element={<LanguagePage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/quests" element={<Quests />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/more" element={<More />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  </AppProvider>
);

export default App;
