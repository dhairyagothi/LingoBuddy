import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';
import RightSidebar from '../components/RightSidebar';
import api from '../services/api';

const Quiz = () => {
  const { languageId } = useParams();
  const navigate = useNavigate();
  
  // Quiz state
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStartTime, setQuizStartTime] = useState(null);
  
  // Results state
  const [quizResults, setQuizResults] = useState(null);

  const languageInfo = {
    spanish: { name: 'Spanish', flag: '🇪🇸', color: 'from-red-500 to-yellow-500' },
    french: { name: 'French', flag: '🇫🇷', color: 'from-blue-500 to-red-500' },
    german: { name: 'German', flag: '🇩🇪', color: 'from-black to-red-500' },
    italian: { name: 'Italian', flag: '🇮🇹', color: 'from-green-500 to-red-500' },
    portuguese: { name: 'Portuguese', flag: '🇧🇷', color: 'from-green-500 to-yellow-500' },
    japanese: { name: 'Japanese', flag: '🇯🇵', color: 'from-white to-red-500' },
    korean: { name: 'Korean', flag: '🇰🇷', color: 'from-blue-500 to-red-500' },
    chinese: { name: 'Chinese', flag: '🇨🇳', color: 'from-red-500 to-yellow-500' }
  };

  // Fetch available quizzes from backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/quiz/${languageId}`);
        
        if (response.success && response.quizzes.length > 0) {
          setQuizzes(response.quizzes);
          console.log(`✅ Loaded ${response.quizzes.length} quizzes from ${response.source}`);
        } else {
          console.warn('No quizzes available');
          setQuizzes([]);
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    if (languageId) {
      fetchQuizzes();
    }
  }, [languageId]);

  // Timer effect
  useEffect(() => {
    if (selectedQuiz && timeLeft > 0 && !showResult && !showExplanation) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && selectedQuiz && !showExplanation) {
      handleAnswer(null);
    }
  }, [timeLeft, showResult, showExplanation, selectedQuiz]);

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setTimeLeft(quiz.timeLimit || 30);
    setQuizStartTime(Date.now());
    setShowResult(false);
    setQuizResults(null);
  };

  const handleAnswer = (answerIndex) => {
    if (!selectedQuiz || showExplanation) return;

    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    const answer = {
      questionIndex: currentQuestionIndex,
      question: currentQuestion.question,
      selectedAnswer: answerIndex,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      points: isCorrect ? (currentQuestion.points || 10) : 0
    };

    setUserAnswers([...userAnswers, answer]);
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    setTimeout(() => {
      if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
        nextQuestion();
      } else {
        finishQuiz();
      }
    }, 2500);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimeLeft(selectedQuiz.timeLimit || 30);
  };

  const finishQuiz = async () => {
    const endTime = Date.now();
    const totalTime = Math.round((endTime - quizStartTime) / 1000);
    
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    const totalQuestions = selectedQuiz.questions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const totalPoints = userAnswers.reduce((sum, answer) => sum + answer.points, 0);

    const results = {
      correctAnswers,
      totalQuestions,
      percentage,
      totalPoints,
      timeSpent: totalTime,
      passed: percentage >= (selectedQuiz.passScore || 60)
    };

    setQuizResults(results);
    setShowResult(true);
    await submitQuizResults(results, totalTime);
  };

  const submitQuizResults = async (results, timeSpent) => {
    if (!selectedQuiz) return;

    setSubmitting(true);
    try {
      const submissionData = {
        userId: 'guest',
        answers: userAnswers,
        timeSpent,
        score: results.totalPoints,
        percentage: results.percentage
      };

      const response = await api.post(`/quiz/${languageId}/${selectedQuiz._id || selectedQuiz.quizId}/submit`, submissionData);
      
      if (response.success) {
        console.log('✅ Quiz results submitted successfully');
        setQuizResults({
          ...results,
          xpEarned: response.result.xpEarned,
          gemsEarned: response.result.gemsEarned,
          resultId: response.result.resultId
        });
      }
    } catch (error) {
      console.error('❌ Error submitting quiz results:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResult(false);
    setQuizResults(null);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <HeaderBar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading quizzes...</p>
            </div>
          </div>
        </div>
        <RightSidebar />
      </div>
    );
  }

  const currentLanguage = languageInfo[languageId] || languageInfo.spanish;

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <HeaderBar />
        
        <div className="flex-1 overflow-auto p-6">
          {!selectedQuiz ? (
            <div className="max-w-4xl mx-auto">
              <div className={`bg-gradient-to-r ${currentLanguage.color} p-6 rounded-2xl text-white mb-8`}>
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{currentLanguage.flag}</span>
                  <div>
                    <h1 className="text-3xl font-bold">{currentLanguage.name} Quizzes</h1>
                    <p className="text-white/90 mt-2">Choose a quiz to test your knowledge</p>
                  </div>
                </div>
              </div>

              {quizzes.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                  <div className="text-6xl mb-4">📚</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">No Quizzes Available</h2>
                  <p className="text-gray-600 mb-6">
                    There are no quizzes available for {currentLanguage.name} at the moment.
                  </p>
                  <button
                    onClick={() => navigate('/lessons')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Browse Lessons Instead
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quizzes.map((quiz, index) => (
                    <div key={quiz._id || index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          quiz.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                          quiz.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {quiz.difficulty || 'Beginner'}
                        </div>
                        <div className="text-sm text-gray-500">Level {quiz.level || 1}</div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{quiz.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">{quiz.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>🎯 {quiz.questions?.length || 0} questions</span>
                        <span>⏱️ {quiz.timeLimit || 30}s per question</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-blue-600 font-semibold">+{quiz.xpReward || 10} XP</span>
                          <span className="text-purple-600 font-semibold ml-2">+{quiz.gemsReward || 5} 💎</span>
                        </div>
                        <button
                          onClick={() => startQuiz(quiz)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors"
                        >
                          Start Quiz
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : !showResult ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedQuiz.title}</h2>
                    <p className="text-gray-600">Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}</p>
                  </div>
                  <button
                    onClick={resetQuiz}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    ✕ Exit Quiz
                  </button>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-blue-600'}`}>
                    ⏱️ {timeLeft}s
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    {selectedQuiz.questions[currentQuestionIndex]?.question}
                  </h3>
                </div>

                <div className="grid gap-4">
                  {selectedQuiz.questions[currentQuestionIndex]?.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showExplanation}
                      className={`p-4 rounded-xl text-left transition-all duration-300 font-semibold ${
                        showExplanation
                          ? index === selectedQuiz.questions[currentQuestionIndex].correctAnswer
                            ? 'bg-green-100 border-2 border-green-500 text-green-800'
                            : index === selectedAnswer && selectedAnswer !== selectedQuiz.questions[currentQuestionIndex].correctAnswer
                            ? 'bg-red-100 border-2 border-red-500 text-red-800'
                            : 'bg-gray-100 text-gray-600'
                          : 'bg-gray-50 hover:bg-blue-50 border-2 border-transparent hover:border-blue-300 text-gray-800'
                      }`}
                    >
                      <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </button>
                  ))}
                </div>

                {showExplanation && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">💡</span>
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-1">Explanation</h4>
                        <p className="text-blue-700">
                          {selectedQuiz.questions[currentQuestionIndex]?.explanation || 'No explanation available.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="mb-6">
                  <div className="text-6xl mb-4">
                    {quizResults?.passed ? '🎉' : '📚'}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {quizResults?.passed ? 'Congratulations!' : 'Keep Learning!'}
                  </h2>
                  <p className="text-gray-600">
                    {quizResults?.passed 
                      ? 'You passed the quiz! Great job!' 
                      : 'Don\'t give up! Practice makes perfect.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">{quizResults?.correctAnswers || 0}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">{quizResults?.percentage || 0}%</div>
                    <div className="text-sm text-gray-600">Score</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">+{quizResults?.xpEarned || selectedQuiz.xpReward || 0}</div>
                    <div className="text-sm text-gray-600">XP Earned</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-yellow-600">+{quizResults?.gemsEarned || selectedQuiz.gemsReward || 0}</div>
                    <div className="text-sm text-gray-600">Gems</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => startQuiz(selectedQuiz)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Choose Another Quiz
                  </button>
                  <button
                    onClick={() => navigate('/lessons')}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Continue Learning
                  </button>
                </div>

                {submitting && (
                  <div className="mt-4 text-sm text-gray-500">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 inline-block mr-2"></div>
                    Saving results...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <RightSidebar />
    </div>
  );
};

export default Quiz;
