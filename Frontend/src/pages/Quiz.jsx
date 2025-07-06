import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import HeaderBar from '../components/HeaderBar';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';

const Quiz = () => {
  const { languageId } = useParams();
  const navigate = useNavigate();
  
  // States
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Fetch quizzes for the language
  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!languageId) return;
      
      try {
        setLoading(true);
        const response = await api.get(`/quiz/${languageId}`);
        setQuizzes(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching quizzes:', err);
        setError('Failed to load quizzes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [languageId]);

  // Timer effect
  useEffect(() => {
    let timer;
    if (selectedQuiz && isQuizStarted && timeLeft > 0 && !showFeedback) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleNextQuestion();
            return selectedQuiz.timeLimit;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isQuizStarted, showFeedback, selectedQuiz]);

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeLeft(quiz.timeLimit);
    setIsQuizStarted(true);
    setShowResults(false);
    setResults(null);
    setShowFeedback(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
    
    setShowFeedback(true);
    
    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(selectedQuiz.timeLimit);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    try {
      const response = await api.post(`/quiz/${languageId}/${selectedQuiz.quizId}/submit`, {
        answers
      });
      
      setResults(response.data);
      setShowResults(true);
      setIsQuizStarted(false);
    } catch (err) {
      console.error('Error submitting quiz:', err);
      setError('Failed to submit quiz. Please try again.');
    }
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
    setIsQuizStarted(false);
    setTimeLeft(null);
    setShowFeedback(false);
    setSelectedAnswer(null);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-green-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <HeaderBar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading quizzes...</p>
            </div>
          </div>
        </div>
        <RightSidebar />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-green-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <HeaderBar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <RightSidebar />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-green-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar />
        <div className="flex-1 overflow-y-auto p-6">
          {!selectedQuiz && !showResults && (
            <QuizSelection 
              quizzes={quizzes} 
              languageId={languageId} 
              onStartQuiz={startQuiz}
            />
          )}
          
          {selectedQuiz && isQuizStarted && !showResults && (
            <QuizQuestion
              quiz={selectedQuiz}
              question={selectedQuiz.questions[currentQuestionIndex]}
              questionIndex={currentQuestionIndex}
              totalQuestions={selectedQuiz.questions.length}
              timeLeft={timeLeft}
              onAnswerSelect={handleAnswerSelect}
              showFeedback={showFeedback}
              selectedAnswer={selectedAnswer}
            />
          )}
          
          {showResults && results && (
            <QuizResults
              results={results}
              quiz={selectedQuiz}
              onReturnToQuizzes={resetQuiz}
            />
          )}
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

// Quiz Selection Component
const QuizSelection = ({ quizzes, languageId, onStartQuiz }) => {
  if (quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Quizzes Available</h2>
        <p className="text-gray-600">No quizzes found for {languageId}. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {languageId?.charAt(0).toUpperCase() + languageId?.slice(1)} Quizzes
        </h1>
        <p className="text-gray-600">Test your knowledge and earn XP!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.quizId} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">{quiz.title}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                quiz.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                quiz.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {quiz.difficulty}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <span>📝 {quiz.questions?.length || 0} questions</span>
              <span>⏱️ {quiz.timeLimit}s per question</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 font-semibold">+{quiz.xpReward} XP</span>
                <span className="text-yellow-600 font-semibold">+{quiz.gemsReward} 💎</span>
              </div>
              <span className="text-sm text-gray-500">Level {quiz.level}</span>
            </div>
            
            <button
              onClick={() => onStartQuiz(quiz)}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Quiz Question Component
const QuizQuestion = ({ 
  quiz, 
  question, 
  questionIndex, 
  totalQuestions, 
  timeLeft, 
  onAnswerSelect, 
  showFeedback, 
  selectedAnswer 
}) => {
  const progress = ((questionIndex + 1) / totalQuestions) * 100;
  const timeProgress = (timeLeft / quiz.timeLimit) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{quiz.title}</h2>
          <span className="text-sm text-gray-500">
            Question {questionIndex + 1} of {totalQuestions}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Timer */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Progress: {Math.round(progress)}%</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Time:</span>
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  timeProgress > 30 ? 'bg-green-500' : 
                  timeProgress > 10 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${timeProgress}%` }}
              ></div>
            </div>
            <span className="text-sm font-mono text-gray-800">{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          {question.question}
        </h3>
        
        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrect = showFeedback && isCorrect;
            const showIncorrect = showFeedback && isSelected && !isCorrect;
            
            return (
              <button
                key={index}
                onClick={() => onAnswerSelect(index)}
                disabled={showFeedback}
                className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  showCorrect 
                    ? 'bg-green-100 border-green-500 text-green-800' 
                    : showIncorrect 
                    ? 'bg-red-100 border-red-500 text-red-800'
                    : isSelected 
                    ? 'bg-blue-100 border-blue-500 text-blue-800'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-white border-2 border-current flex items-center justify-center mr-3 text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showCorrect && <span className="ml-2">✅</span>}
                  {showIncorrect && <span className="ml-2">❌</span>}
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Explanation */}
        {showFeedback && question.explanation && (
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
            <p className="text-blue-700">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Quiz Results Component
const QuizResults = ({ results, quiz, onReturnToQuizzes }) => {
  const { score, percentage, correctAnswers, totalQuestions, xpEarned, gemsEarned, passed } = results;
  
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Result Icon */}
        <div className="text-8xl mb-6">
          {passed ? '🎉' : '💪'}
        </div>
        
        {/* Result Title */}
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          {passed ? 'Congratulations!' : 'Keep Learning!'}
        </h2>
        
        <p className="text-xl text-gray-600 mb-8">
          {passed 
            ? 'You passed the quiz! Great job!' 
            : 'You didn\'t pass this time, but don\'t give up!'}
        </p>
        
        {/* Score Display */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-gray-800">{percentage}%</div>
            <div className="text-gray-600">Final Score</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-gray-800">{correctAnswers}/{totalQuestions}</div>
            <div className="text-gray-600">Correct Answers</div>
          </div>
        </div>
        
        {/* Rewards */}
        {passed && (
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Rewards Earned!</h3>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">+{xpEarned}</div>
                <div className="text-blue-600">XP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">+{gemsEarned}</div>
                <div className="text-yellow-600">Gems 💎</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onReturnToQuizzes}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Try Another Quiz
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
