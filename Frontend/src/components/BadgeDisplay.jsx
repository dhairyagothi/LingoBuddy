import React from 'react';
import badge1 from '../assets/badge1.svg';
import badge2 from '../assets/badge2.svg';

const badges = [
  { id: 1, name: 'First Lesson', icon: badge1 },
  { id: 2, name: '5 Day Streak', icon: badge2 },
];

const BadgeDisplay = () => (
  <div className="flex gap-6 justify-center my-4">
    {badges.map(badge => (
      <div key={badge.id} className="flex flex-col items-center bg-bgLight rounded-xl shadow-md px-4 py-2 min-w-[80px]">
        <img src={badge.icon} alt={badge.name} className="w-10 h-10 mb-1" />
        <div className="text-sm font-semibold text-gray-700 mt-1">{badge.name}</div>
      </div>
    ))}
  </div>
);

export default BadgeDisplay; 