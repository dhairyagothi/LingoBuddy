import React from 'react';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';
import RightSidebar from '../components/RightSidebar';
import FooterLinks from '../components/FooterLinks';

const Quests = () => {
  const quests = [
    {
      id: 1,
      title: 'Daily Learner',
      description: 'Complete 1 lesson today',
      progress: 1,
      target: 1,
      reward: '10 XP + 5 Gems',
      icon: '📚',
      completed: true
    },
    {
      id: 2,
      title: 'Streak Master',
      description: 'Maintain a 7-day learning streak',
      progress: 5,
      target: 7,
      reward: '50 XP + 20 Gems',
      icon: '🔥',
      completed: false
    },
    {
      id: 3,
      title: 'Quiz Champion',
      description: 'Score 80% or higher on 3 quizzes',
      progress: 1,
      target: 3,
      reward: '30 XP + 15 Gems',
      icon: '🧠',
      completed: false
    },
    {
      id: 4,
      title: 'Vocabulary Builder',
      description: 'Learn 50 new words',
      progress: 23,
      target: 50,
      reward: '40 XP + Heart Refill',
      icon: '📝',
      completed: false
    },
    {
      id: 5,
      title: 'Polyglot',
      description: 'Start learning 3 different languages',
      progress: 1,
      target: 3,
      reward: '100 XP + 50 Gems',
      icon: '🌍',
      completed: false
    },
    {
      id: 6,
      title: 'Perfect Week',
      description: 'Complete all daily goals for 7 days',
      progress: 2,
      target: 7,
      reward: '75 XP + Special Badge',
      icon: '⭐',
      completed: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#0f1419] text-white overflow-hidden">
      <Sidebar />
      <HeaderBar />
      
      <div className="ml-64 mr-80 flex flex-col items-center justify-start min-h-screen pt-8 px-4">
        {/* Header */}
        <div className="w-full max-w-4xl mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">🎯 Daily Quests</h1>
          <p className="text-gray-400 text-lg">Complete quests to earn extra XP and gems</p>
        </div>

        {/* Quests Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {quests.map((quest) => (
            <div
              key={quest.id}
              className={`
                bg-gradient-to-br from-[#1e2d3a] to-[#2a3f52] rounded-2xl p-6 transition-all duration-300 
                ${quest.completed 
                  ? 'ring-2 ring-green-500 bg-gradient-to-br from-green-900/20 to-green-800/20' 
                  : 'hover:scale-102 hover:shadow-xl cursor-pointer'
                }
              `}
            >
              {/* Quest Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{quest.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold">{quest.title}</h3>
                    <p className="text-gray-400 text-sm">{quest.description}</p>
                  </div>
                </div>
                {quest.completed && (
                  <div className="bg-green-600 rounded-full p-2">
                    <span className="text-white text-lg">✓</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{quest.progress}/{quest.target}</span>
                </div>
                <div className="bg-[#2c394b] rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      quest.completed ? 'bg-green-500' : 'bg-[#b9e937]'
                    }`}
                    style={{ width: `${Math.min((quest.progress / quest.target) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Reward */}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-gray-400">Reward: </span>
                  <span className="text-[#b9e937] font-bold">{quest.reward}</span>
                </div>
                {quest.completed ? (
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold cursor-not-allowed opacity-75">
                    Completed
                  </button>
                ) : quest.progress >= quest.target ? (
                  <button className="bg-[#b9e937] text-[#14213d] px-4 py-2 rounded-lg font-bold hover:bg-[#a8d429] transition-colors cursor-pointer">
                    Claim Reward
                  </button>
                ) : (
                  <button className="bg-[#3a4a5c] text-gray-400 px-4 py-2 rounded-lg font-bold cursor-not-allowed">
                    In Progress
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Challenge */}
        <div className="w-full max-w-4xl mt-8">
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">🏆 Weekly Challenge</h2>
            <p className="text-lg mb-4">Complete 15 lessons this week to unlock a special badge!</p>
            <div className="bg-[#2c394b] rounded-full h-4 overflow-hidden mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-500"
                style={{ width: '60%' }}
              ></div>
            </div>
            <p className="text-gray-400">9/15 lessons completed</p>
          </div>
        </div>
      </div>
      
      <RightSidebar />
      <FooterLinks />
    </div>
  );
};

export default Quests;
