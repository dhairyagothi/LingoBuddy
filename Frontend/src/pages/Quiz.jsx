import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';
import RightSidebar from '../components/RightSidebar';

const Quiz = () => {
  const { languageId } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showExplanation, setShowExplanation] = useState(false);

  const languageInfo = {
    spanish: { name: 'Spanish', flag: '🇪🇸' },
    french: { name: 'French', flag: '🇫🇷' },
    german: { name: 'German', flag: '🇩🇪' },
    italian: { name: 'Italian', flag: '🇮🇹' },
    portuguese: { name: 'Portuguese', flag: '🇧🇷' },
    japanese: { name: 'Japanese', flag: '🇯🇵' },
    korean: { name: 'Korean', flag: '🇰🇷' },
    chinese: { name: 'Chinese', flag: '🇨🇳' }
  };

  const staticQuizData = {
    spanish: {
      title: 'Spanish Basic Quiz',
      questions: [
        {
          question: 'How do you say "Hello" in Spanish?',
          options: ['Hola', 'Bonjour', 'Ciao', 'Hallo'],
          correctAnswer: 0,
          explanation: 'Hola is the most common way to say hello in Spanish.'
        },
        {
          question: 'What does "Gracias" mean?',
          options: ['Goodbye', 'Please', 'Thank you', 'Sorry'],
          correctAnswer: 2,
          explanation: 'Gracias means "thank you" in Spanish.'
        },
        {
          question: 'How do you say "Good morning" in Spanish?',
          options: ['Buenas tardes', 'Buenos días', 'Buenas noches', 'Hasta luego'],
          correctAnswer: 1,
          explanation: 'Buenos días means "good morning" in Spanish.'
        }
      ]
    },
    french: {
      title: 'French Basic Quiz',
      questions: [
        {
          question: 'How do you say "Hello" in French?',
          options: ['Salut', 'Bonjour', 'Bonsoir', 'Au revoir'],
          correctAnswer: 1,
          explanation: 'Bonjour is the formal way to say hello in French.'
        },
        {
          question: 'What does "Merci" mean?',
          options: ['Hello', 'Please', 'Thank you', 'Sorry'],
          correctAnswer: 2,
          explanation: 'Merci means "thank you" in French.'
        }
      ]
    }
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/quiz/${languageId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.quizzes && data.quizzes.length > 0) {
            // Use the first quiz for this language
            const quiz = data.quizzes[0];
            setQuizData({
              title: quiz.title,
              questions: quiz.questions
            });
          } else {
            // Fallback to static data if no quizzes found
            const quiz = staticQuizData[languageId] || staticQuizData.spanish;
            setQuizData(quiz);
          }
        } else {
          // Fallback to static data if API fails
          const quiz = staticQuizData[languageId] || staticQuizData.spanish;
          setQuizData(quiz);
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        // Fallback to static data
        const quiz = staticQuizData[languageId] || staticQuizData.spanish;
        setQuizData(quiz);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [languageId]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !showExplanation) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleAnswer(null);
    }
  }, [timeLeft, showResult, showExplanation]);

  const handleAnswer = (answerIndex) => {
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    setTimeout(() => {
      setShowExplanation(false);
      setSelectedAnswer(null);
      
      if (currentQuestionIndex < quizData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(15);
      } else {
        setShowResult(true);
      }
    }, 3000);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setTimeLeft(15);
    setShowExplanation(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#0f1419] text-white">
        <Sidebar />
        <HeaderBar />
        <div className="flex flex-col items-center justify-center min-h-screen ml-64 mr-80">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#b9e937]"></div>
          <p className="mt-4 text-lg">Loading quiz...</p>
        </div>
        <RightSidebar />
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#0f1419] text-white">
        <Sidebar />
        <HeaderBar />
        <div className="flex flex-col items-center justify-center min-h-screen ml-64 mr-80">
          <div className="mb-4 text-xl text-red-400">Quiz not available</div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-[#b9e937] text-[#14213d] rounded-xl font-bold hover:bg-[#a8d429] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
        <RightSidebar />
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#0f1419] text-white overflow-hidden">
      <Sidebar />
      <HeaderBar />
      
      <div className="flex flex-col items-center justify-start min-h-screen px-4 pt-8 ml-64 mr-80">
        {!showResult ? (
          <>
            {/* Quiz Header */}
            <div className="w-full max-w-4xl mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{languageInfo[languageId]?.flag}</span>
                  <div>
                    <h1 className="text-3xl font-bold">{quizData.title}</h1>
                    <p className="text-gray-400">{languageInfo[languageId]?.name} Quiz</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Question {currentQuestionIndex + 1} of {quizData.questions.length}</div>
                  <div className="flex items-center mt-1 space-x-2">
                    <div className="text-lg">⏱️</div>
                    <div className={`text-lg font-bold ${timeLeft <= 5 ? 'text-red-400' : 'text-[#b9e937]'}`}>
                      {timeLeft}s
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-3 mb-6 bg-gray-700 rounded-full">
                <div 
                  className="bg-gradient-to-r from-[#b9e937] to-[#1cb0f6] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <div className="w-full max-w-4xl bg-gradient-to-br from-[#1e2d3a] to-[#2a3f52] rounded-3xl p-8 mb-8 shadow-2xl">
              <h2 className="mb-8 text-2xl font-bold text-center">{currentQuestion.question}</h2>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showExplanation && handleAnswer(index)}
                    disabled={showExplanation}
                    className={`
                      p-6 rounded-2xl text-left transition-all duration-300 text-lg font-semibold
                      ${showExplanation
                        ? index === currentQuestion.correctAnswer
                          ? 'bg-green-500 text-white ring-4 ring-green-300'
                          : selectedAnswer === index
                            ? 'bg-red-500 text-white ring-4 ring-red-300'
                            : 'bg-gray-600 text-gray-300'
                        : 'bg-[#2c394b] hover:bg-[#3a4a5c] hover:scale-105 cursor-pointer transform transition-transform'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center justify-center w-8 h-8 text-sm font-bold rounded-full bg-white/20">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Explanation */}
              {showExplanation && currentQuestion.explanation && (
                <div className="p-4 mt-6 border bg-blue-900/30 rounded-xl border-blue-400/30 animate-fade-in">
                  <div className="flex items-start space-x-2">
                    <span className="text-lg text-blue-400">💡</span>
                    <div>
                      <h4 className="mb-1 font-semibold text-blue-400">Explanation</h4>
                      <p className="text-gray-300">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Results Screen */
          <div className="w-full max-w-4xl">
            <div className="bg-gradient-to-br from-[#1e2d3a] to-[#2a3f52] rounded-3xl p-8 text-center shadow-2xl">
              <div className="mb-4 text-6xl">
                {score === quizData.questions.length ? '🏆' : score >= quizData.questions.length * 0.7 ? '🎉' : '📚'}
              </div>
              
              <h2 className="mb-4 text-3xl font-bold">
                {score === quizData.questions.length 
                  ? 'Perfect Score!' 
                  : score >= quizData.questions.length * 0.7 
                    ? 'Great Job!' 
                    : 'Keep Practicing!'}
              </h2>
              
              <div className="text-6xl font-bold text-[#b9e937] mb-4">
                {score}/{quizData.questions.length}
              </div>
              
              <p className="mb-8 text-xl text-gray-300">
                You scored {Math.round((score / quizData.questions.length) * 100)}%
              </p>
              
              {/* XP Earned */}
              <div className="flex items-center justify-center p-4 mb-8 space-x-2 bg-yellow-900/30 rounded-xl">
                <span className="text-2xl">⭐</span>
                <span className="text-lg font-semibold">
                  +{Math.round(((score / quizData.questions.length) * 100) * 0.4)} XP Earned!
                </span>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={restartQuiz}
                  className="px-8 py-4 bg-[#2c394b] hover:bg-[#3a4a5c] rounded-xl font-bold transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate(`/language/${languageId}`)}
                  className="px-8 py-4 bg-[#b9e937] text-[#14213d] rounded-xl font-bold hover:bg-[#a8d429] transition-colors"
                >
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <RightSidebar />
    </div>
  );
};

export default Quiz;
