import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';
import RightSidebar from '../components/RightSidebar';
import FooterLinks from '../components/FooterLinks';
import LessonCard from '../components/LessonCard';

const Lessons = () => {
  const { languageId } = useParams();
  const navigate = useNavigate();
  
  const languageData = {
    spanish: { name: 'Spanish', flag: '🇪🇸' },
    french: { name: 'French', flag: '🇫🇷' },
    german: { name: 'German', flag: '🇩🇪' },
    italian: { name: 'Italian', flag: '🇮🇹' },
    portuguese: { name: 'Portuguese', flag: '🇧🇷' },
    japanese: { name: 'Japanese', flag: '🇯🇵' },
    korean: { name: 'Korean', flag: '🇰🇷' },
    chinese: { name: 'Chinese', flag: '🇨🇳' }
  };

  const currentLanguage = languageId ? languageData[languageId] : { name: 'All Languages', flag: '🌍' };

  const lessons = [
    { 
      id: 1,
      title: 'Basics', 
      description: 'Start with the basics!', 
      locked: false,
      progress: 100,
      xp: 120,
      language: 'All'
    },
    { 
      id: 2,
      title: 'Greetings', 
      description: 'Learn common greetings.', 
      locked: false,
      progress: 75,
      xp: 90,
      language: 'All'
    },
    { 
      id: 3,
      title: 'Food & Drinks', 
      description: 'Talk about food and beverages.', 
      locked: false,
      progress: 50,
      xp: 60,
      language: 'All'
    },
    { 
      id: 4,
      title: 'Family', 
      description: 'Learn family vocabulary.', 
      locked: false,
      progress: 25,
      xp: 30,
      language: 'All'
    },
    { 
      id: 5,
      title: 'Numbers', 
      description: 'Count from 1 to 100.', 
      locked: false,
      progress: 0,
      xp: 0,
      language: 'All'
    },
    { 
      id: 6,
      title: 'Colors', 
      description: 'Learn colors and descriptions.', 
      locked: true,
      progress: 0,
      xp: 0,
      language: 'All'
    },
    { 
      id: 7,
      title: 'Clothing', 
      description: 'Describe what you wear.', 
      locked: true,
      progress: 0,
      xp: 0,
      language: 'All'
    },
    { 
      id: 8,
      title: 'Travel', 
      description: 'Essential travel phrases.', 
      locked: true,
      progress: 0,
      xp: 0,
      language: 'All'
    }
  ];

  const handleLessonClick = (lesson) => {
    if (!lesson.locked) {
      navigate(`/lessons/${lesson.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#0f1419] text-white overflow-hidden">
      <Sidebar />
      <HeaderBar />
      
      <div className="ml-64 mr-80 flex flex-col items-center justify-start min-h-screen pt-8 px-4">
        {/* Header */}
        <div className="w-full max-w-6xl mb-8">
          <div className="flex items-center justify-center mb-6">
            <span className="text-6xl mr-4">{currentLanguage.flag}</span>
            <div>
              <h1 className="text-4xl font-bold">{currentLanguage.name} Lessons</h1>
              <p className="text-gray-400 text-lg">Master the language step by step</p>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex justify-center gap-4 mb-6">
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#1cb0f6] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#1a9bd8] transition-colors cursor-pointer"
            >
              🏠 Dashboard
            </button>
            {languageId && (
              <button 
                onClick={() => navigate(`/quiz/${languageId}`)}
                className="bg-[#b9e937] text-[#14213d] font-bold py-3 px-6 rounded-xl hover:bg-[#a8d429] transition-colors cursor-pointer"
              >
                📝 Take Quiz
              </button>
            )}
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => handleLessonClick(lesson)}
              className={`
                bg-gradient-to-br from-[#1e2d3a] to-[#2a3f52] rounded-2xl p-6 transition-all duration-300 
                ${lesson.locked 
                  ? 'opacity-60 cursor-not-allowed' 
                  : 'hover:scale-105 hover:shadow-xl cursor-pointer'
                }
              `}
            >
              {/* Lesson Header */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{lesson.title}</h3>
                {lesson.locked && <span className="text-2xl">🔒</span>}
              </div>
              
              {/* Description */}
              <p className="text-gray-400 text-sm mb-4">{lesson.description}</p>
              
              {/* Progress Bar */}
              {!lesson.locked && lesson.progress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{lesson.progress}%</span>
                  </div>
                  <div className="bg-[#2c394b] rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-[#b9e937] h-full transition-all duration-500"
                      style={{ width: `${lesson.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {/* XP and Status */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <span className="text-lg">⭐</span>
                  <span className="font-bold">{lesson.xp} XP</span>
                </div>
                <div className={`
                  px-3 py-1 rounded-full text-xs font-bold
                  ${lesson.locked 
                    ? 'bg-gray-600 text-gray-300' 
                    : lesson.progress === 100
                      ? 'bg-green-600 text-white'
                      : lesson.progress > 0
                        ? 'bg-yellow-600 text-white'
                        : 'bg-[#b9e937] text-[#14213d]'
                  }
                `}>
                  {lesson.locked 
                    ? 'Locked' 
                    : lesson.progress === 100
                      ? 'Complete'
                      : lesson.progress > 0
                        ? 'In Progress'
                        : 'Start'
                  }
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Study Tips */}
        <div className="w-full max-w-4xl mt-12">
          <div className="bg-gradient-to-r from-blue-900/50 to-green-900/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">📚 Study Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <span className="text-3xl mb-2 block">🎯</span>
                <h3 className="font-bold mb-2">Set Goals</h3>
                <p className="text-sm text-gray-400">Complete 1-2 lessons daily for consistent progress</p>
              </div>
              <div>
                <span className="text-3xl mb-2 block">🔄</span>
                <h3 className="font-bold mb-2">Practice Regularly</h3>
                <p className="text-sm text-gray-400">Review previous lessons to reinforce learning</p>
              </div>
              <div>
                <span className="text-3xl mb-2 block">🏆</span>
                <h3 className="font-bold mb-2">Track Progress</h3>
                <p className="text-sm text-gray-400">Monitor your XP and completion percentage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <RightSidebar />
      <FooterLinks />
    </div>
  );
};

export default Lessons; 