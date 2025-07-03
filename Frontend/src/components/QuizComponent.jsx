import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sampleQuestion = {
  question: 'How do you say "Hello" in Spanish?',
  options: ['Hola', 'Bonjour', 'Ciao', 'Hallo'],
  answer: 0,
};

const QuizComponent = () => {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = idx => setSelected(idx);
  const handleSubmit = () => setShowResult(true);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto flex flex-col items-center">
      <div className="text-lg font-bold mb-4 text-blue">{sampleQuestion.question}</div>
      <div className="flex flex-col gap-3 w-full mb-4">
        {sampleQuestion.options.map((opt, idx) => (
          <button
            key={idx}
            className={`w-full py-2 rounded-xl border-2 font-semibold transition-colors duration-200 ${selected === idx ? 'bg-green text-white border-green' : 'bg-bgLight text-blue border-blue hover:bg-blue hover:text-white'}`}
            onClick={() => handleSelect(idx)}
            disabled={showResult}
          >
            {opt}
          </button>
        ))}
      </div>
      {!showResult && (
        <button
          className="bg-yellow text-orange font-bold px-6 py-2 rounded-full shadow hover:bg-orange hover:text-white transition-colors"
          onClick={handleSubmit}
          disabled={selected === null}
        >
          Submit
        </button>
      )}
      <AnimatePresence>
        {showResult && (
          <motion.div
            className={`mt-4 text-lg font-bold ${selected === sampleQuestion.answer ? 'text-green' : 'text-red-500'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {selected === sampleQuestion.answer ? 'Correct! 🎉' : 'Try again!'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizComponent; 