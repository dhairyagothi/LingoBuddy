import React from 'react';

const LessonCard = ({ title, description, locked }) => (
  <div className={`relative bg-blue text-white rounded-2xl shadow-lg p-6 min-w-[220px] transition-transform hover:scale-105 ${locked ? 'opacity-60 bg-gray-300 pointer-events-none' : 'cursor-pointer'}`}>
    <div className="text-xl font-bold mb-2 flex items-center gap-2">
      {title}
      {locked && <span className="ml-2 text-2xl">🔒</span>}
    </div>
    <div className="text-base mb-1">{description}</div>
  </div>
);

export default LessonCard; 