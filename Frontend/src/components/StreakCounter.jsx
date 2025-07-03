import React from 'react';
import { motion } from 'framer-motion';

const StreakCounter = ({ streak = 5 }) => (
  <motion.div
    className="flex items-center bg-yellow text-orange font-bold rounded-full px-6 py-2 shadow-lg gap-2 text-lg my-4"
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <span role="img" aria-label="fire" className="text-2xl animate-pulse">🔥</span>
    <span className="text-2xl">{streak}</span>
    <span className="ml-1">day streak!</span>
  </motion.div>
);

export default StreakCounter; 