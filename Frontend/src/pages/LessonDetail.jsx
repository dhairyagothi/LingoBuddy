import React from 'react';
import Navbar from '../components/Navbar';
import QuizComponent from '../components/QuizComponent';
import Footer from '../components/Footer';

const LessonDetail = () => (
  <div className="min-h-screen bg-bgLight flex flex-col">
    <Navbar />
    <main className="flex flex-col items-center flex-1 px-4 py-8">
      <h2 className="text-2xl font-bold text-blue mb-6">Lesson Title</h2>
      <QuizComponent />
    </main>
    <Footer />
  </div>
);

export default LessonDetail; 