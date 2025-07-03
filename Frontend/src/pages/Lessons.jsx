import React from 'react';
import Navbar from '../components/Navbar';
import LessonCard from '../components/LessonCard';
import Footer from '../components/Footer';

const lessons = [
  { title: 'Basics', description: 'Start with the basics!', locked: false },
  { title: 'Greetings', description: 'Learn greetings.', locked: false },
  { title: 'Food', description: 'Talk about food.', locked: true },
];

const Lessons = () => (
  <div className="min-h-screen bg-bgLight flex flex-col">
    <Navbar />
    <main className="flex flex-col items-center flex-1 px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {lessons.map((lesson, idx) => (
          <LessonCard key={idx} {...lesson} />
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Lessons; 