import React from 'react';

const lessons = [
  { id: 1, name: 'Basics', unlocked: true },
  { id: 2, name: 'Greetings', unlocked: true },
  { id: 3, name: 'Food', unlocked: false },
  { id: 4, name: 'Travel', unlocked: false },
];

const ProgressTree = () => (
  <div className="flex items-center justify-center gap-8 my-8">
    {lessons.map((lesson, idx) => (
      <React.Fragment key={lesson.id}>
        <div className="flex flex-col items-center">
          <div className={`w-14 h-14 flex items-center justify-center rounded-full shadow-lg font-bold text-xl mb-1 transition-all ${lesson.unlocked ? 'bg-green text-white scale-110' : 'bg-gray-300 text-gray-400'}`}>{idx + 1}</div>
          <div className="text-sm font-medium text-gray-700">{lesson.name}</div>
        </div>
        {idx < lessons.length - 1 && (
          <div className="w-10 h-1 bg-yellow rounded-full mx-2" />
        )}
      </React.Fragment>
    ))}
  </div>
);

export default ProgressTree; 