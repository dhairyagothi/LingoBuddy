import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';
import RightSidebar from '../components/RightSidebar';

const Quiz = () => {
  const { languageId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quizData = {
    spanish: {
      name: 'Spanish',
      flag: '🇪🇸',
      questions: [
        {
          question: 'How do you say "Hello" in Spanish?',
          options: ['Hola', 'Bonjour', 'Ciao', 'Hallo'],
          correct: 0
        },
        {
          question: 'What does "Gracias" mean?',
          options: ['Goodbye', 'Please', 'Thank you', 'Sorry'],
          correct: 2
        },
        {
          question: 'How do you say "Good morning" in Spanish?',
          options: ['Buenas tardes', 'Buenos días', 'Buenas noches', 'Hasta luego'],
          correct: 1
        },
        {
          question: 'What is "Water" in Spanish?',
          options: ['Fuego', 'Tierra', 'Agua', 'Aire'],
          correct: 2
        },
        {
          question: 'How do you say "I love you" in Spanish?',
          options: ['Te odio', 'Te quiero', 'Te veo', 'Te escucho'],
          correct: 1
        }
      ]
    },
    french: {
      name: 'French',
      flag: '🇫🇷',
      questions: [
        {
          question: 'How do you say "Hello" in French?',
          options: ['Salut', 'Bonjour', 'Bonsoir', 'Au revoir'],
          correct: 1
        },
        {
          question: 'What does "Merci" mean?',
          options: ['Hello', 'Please', 'Thank you', 'Sorry'],
          correct: 2
        },
        {
          question: 'How do you say "Good evening" in French?',
          options: ['Bon matin', 'Bon après-midi', 'Bonsoir', 'Bonne nuit'],
          correct: 2
        },
        {
          question: 'What is "Love" in French?',
          options: ['Amour', 'Haine', 'Joie', 'Tristesse'],
          correct: 0
        },
        {
          question: 'How do you say "Yes" in French?',
          options: ['Non', 'Oui', 'Peut-être', 'Jamais'],
          correct: 1
        }
      ]
    },
    german: {
      name: 'German',
      flag: '🇩🇪',
      questions: [
        {
          question: 'How do you say "Hello" in German?',
          options: ['Hallo', 'Tschüss', 'Guten Tag', 'Auf Wiedersehen'],
          correct: 0
        },
        {
          question: 'What does "Danke" mean?',
          options: ['Hello', 'Please', 'Thank you', 'Sorry'],
          correct: 2
        },
        {
          question: 'How do you say "Good morning" in German?',
          options: ['Guten Abend', 'Guten Morgen', 'Gute Nacht', 'Guten Tag'],
          correct: 1
        },
        {
          question: 'What is "House" in German?',
          options: ['Auto', 'Haus', 'Baum', 'Wasser'],
          correct: 1
        },
        {
          question: 'How do you say "Yes" in German?',
          options: ['Nein', 'Ja', 'Vielleicht', 'Nie'],
          correct: 1
        }
      ]
    },
    italian: {
      name: 'Italian',
      flag: '🇮🇹',
      questions: [
        {
          question: 'How do you say "Hello" in Italian?',
          options: ['Ciao', 'Arrivederci', 'Buongiorno', 'Buonasera'],
          correct: 0
        },
        {
          question: 'What does "Grazie" mean?',
          options: ['Hello', 'Please', 'Thank you', 'Sorry'],
          correct: 2
        },
        {
          question: 'How do you say "Good evening" in Italian?',
          options: ['Buongiorno', 'Buon pomeriggio', 'Buonasera', 'Buonanotte'],
          correct: 2
        },
        {
          question: 'What is "Beautiful" in Italian?',
          options: ['Brutto', 'Bello', 'Grande', 'Piccolo'],
          correct: 1
        },
        {
          question: 'How do you say "I love you" in Italian?',
          options: ['Ti odio', 'Ti amo', 'Ti vedo', 'Ti sento'],
          correct: 1
        }
      ]
    },
    portuguese: {
      name: 'Portuguese',
      flag: '🇧🇷',
      questions: [
        {
          question: 'How do you say "Hello" in Portuguese?',
          options: ['Olá', 'Tchau', 'Boa tarde', 'Boa noite'],
          correct: 0
        },
        {
          question: 'What does "Obrigado" mean?',
          options: ['Hello', 'Please', 'Thank you', 'Sorry'],
          correct: 2
        },
        {
          question: 'How do you say "Good morning" in Portuguese?',
          options: ['Boa tarde', 'Bom dia', 'Boa noite', 'Até logo'],
          correct: 1
        },
        {
          question: 'What is "Family" in Portuguese?',
          options: ['Amigo', 'Família', 'Casa', 'Trabalho'],
          correct: 1
        },
        {
          question: 'How do you say "Yes" in Portuguese?',
          options: ['Não', 'Sim', 'Talvez', 'Nunca'],
          correct: 1
        }
      ]
    },
    japanese: {
      name: 'Japanese',
      flag: '🇯🇵',
      questions: [
        {
          question: 'How do you say "Hello" in Japanese?',
          options: ['こんにちは', 'さようなら', 'おはよう', 'こんばんは'],
          correct: 0
        },
        {
          question: 'What does "ありがとう" mean?',
          options: ['Hello', 'Please', 'Thank you', 'Sorry'],
          correct: 2
        },
        {
          question: 'How do you say "Good morning" in Japanese?',
          options: ['こんばんは', 'おはよう', 'こんにちは', 'おやすみ'],
          correct: 1
        },
        {
          question: 'What is "Water" in Japanese?',
          options: ['火', '土', '水', '風'],
          correct: 2
        },
        {
          question: 'How do you say "Yes" in Japanese?',
          options: ['いいえ', 'はい', 'たぶん', 'ぜったい'],
          correct: 1
        }
      ]
    },
    korean: {
      name: 'Korean',
      flag: '🇰🇷',
      questions: [
        {
          question: 'How do you say "Hello" in Korean?',
          options: ['안녕하세요', '안녕히 가세요', '좋은 아침', '좋은 저녁'],
          correct: 0
        },
        {
          question: 'What does "감사합니다" mean?',
          options: ['Hello', 'Please', 'Thank you', 'Sorry'],
          correct: 2
        },
        {
          question: 'How do you say "Good morning" in Korean?',
          options: ['좋은 저녁', '좋은 아침', '좋은 오후', '안녕히 주무세요'],
          correct: 1
        },
        {
          question: 'What is "Love" in Korean?',
          options: ['사랑', '미움', '기쁨', '슬픔'],
          correct: 0
        },
        {
          question: 'How do you say "Yes" in Korean?',
          options: ['아니요', '네', '아마도', '절대'],
          correct: 1
        }
      ]
    },
    chinese: {
      name: 'Chinese',
      flag: '🇨🇳',
      questions: [
        {
          question: 'How do you say "Hello" in Chinese?',
          options: ['你好', '再见', '早上好', '晚上好'],
          correct: 0
        },
        {
          question: 'What does "谢谢" mean?',
          options: ['Hello', 'Please', 'Thank you', 'Sorry'],
          correct: 2
        },
        {
          question: 'How do you say "Good morning" in Chinese?',
          options: ['晚上好', '早上好', '下午好', '晚安'],
          correct: 1
        },
        {
          question: 'What is "Water" in Chinese?',
          options: ['火', '土', '水', '风'],
          correct: 2
        },
        {
          question: 'How do you say "Yes" in Chinese?',
          options: ['不是', '是的', '也许', '从不'],
          correct: 1
        }
      ]
    }
  };

  const currentQuiz = quizData[languageId] || quizData.spanish;
  const questions = currentQuiz.questions;

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#0f1419] text-white overflow-hidden">
        <Sidebar />
        <HeaderBar />
        
        <div className="ml-64 mr-80 flex flex-col items-center justify-center min-h-screen px-4">
          <div className="bg-gradient-to-br from-[#1e2d3a] to-[#2a3f52] rounded-2xl p-8 max-w-2xl w-full text-center">
            <div className="text-8xl mb-6">{currentQuiz.flag}</div>
            <h1 className="text-4xl font-bold mb-4">Quiz Completed!</h1>
            <p className="text-2xl mb-6">
              You scored <span className="text-[#b9e937] font-bold">{score}</span> out of <span className="text-[#b9e937] font-bold">{questions.length}</span>
            </p>
            <div className="text-6xl mb-6">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
            </div>
            <p className="text-lg text-gray-400 mb-8">
              {percentage >= 80 ? 'Excellent work!' : percentage >= 60 ? 'Good job! Keep practicing!' : 'Keep studying and try again!'}
            </p>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={restartQuiz}
                className="bg-[#b9e937] text-[#14213d] font-bold px-8 py-3 rounded-xl hover:bg-[#a8d429] transition-colors cursor-pointer"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate(`/language/${languageId}`)}
                className="bg-[#1cb0f6] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#1a9bd8] transition-colors cursor-pointer"
              >
                Back to Lessons
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-[#ff4757] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#e63946] transition-colors cursor-pointer"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
        
        <RightSidebar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#0f1419] text-white overflow-hidden">
      <Sidebar />
      <HeaderBar />
      
      <div className="ml-64 mr-80 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="bg-gradient-to-br from-[#1e2d3a] to-[#2a3f52] rounded-2xl p-8 max-w-2xl w-full">
          {/* Quiz Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{currentQuiz.flag}</div>
            <h1 className="text-2xl font-bold mb-2">{currentQuiz.name} Quiz</h1>
            <p className="text-gray-400">Question {currentQuestion + 1} of {questions.length}</p>
            
            {/* Progress Bar */}
            <div className="bg-[#2c394b] rounded-full h-3 mt-4 overflow-hidden">
              <div 
                className="bg-[#b9e937] h-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6 text-center">
              {questions[currentQuestion].question}
            </h2>
            
            {/* Answer Options */}
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`
                    w-full p-4 rounded-xl text-left transition-all duration-200 cursor-pointer
                    ${selectedAnswer === index 
                      ? showResult 
                        ? index === questions[currentQuestion].correct
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'
                        : 'bg-[#b9e937] text-[#14213d] font-bold'
                      : showResult && index === questions[currentQuestion].correct
                        ? 'bg-green-600 text-white'
                        : 'bg-[#3a4a5c] text-white hover:bg-[#4a5a6c]'
                    }
                    ${showResult ? 'cursor-not-allowed' : ''}
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          {!showResult && (
            <div className="text-center">
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className={`
                  font-bold px-8 py-3 rounded-xl transition-colors cursor-pointer
                  ${selectedAnswer !== null
                    ? 'bg-[#b9e937] text-[#14213d] hover:bg-[#a8d429]'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          )}

          {/* Result Feedback */}
          {showResult && (
            <div className="text-center">
              <div className="text-4xl mb-2">
                {selectedAnswer === questions[currentQuestion].correct ? '✅' : '❌'}
              </div>
              <p className="text-lg font-bold">
                {selectedAnswer === questions[currentQuestion].correct ? 'Correct!' : 'Incorrect!'}
              </p>
              {selectedAnswer !== questions[currentQuestion].correct && (
                <p className="text-gray-400 mt-2">
                  The correct answer was: {questions[currentQuestion].options[questions[currentQuestion].correct]}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      
      <RightSidebar />
    </div>
  );
};

export default Quiz; 