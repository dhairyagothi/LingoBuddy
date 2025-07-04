import React from 'react';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';
import RightSidebar from '../components/RightSidebar';
import FooterLinks from '../components/FooterLinks';

const Leaderboard = () => {
  const leaderboardData = [
    { rank: 1, name: 'Maria García', xp: 2580, flag: '🇪🇸', streak: 45 },
    { rank: 2, name: 'Jean Dupont', xp: 2340, flag: '🇫🇷', streak: 32 },
    { rank: 3, name: 'Hans Mueller', xp: 2190, flag: '🇩🇪', streak: 28 },
    { rank: 4, name: 'Sofia Rossi', xp: 1950, flag: '🇮🇹', streak: 23 },
    { rank: 5, name: 'João Silva', xp: 1820, flag: '🇧🇷', streak: 19 },
    { rank: 6, name: 'Yuki Tanaka', xp: 1670, flag: '🇯🇵', streak: 15 },
    { rank: 7, name: 'Kim Min-jun', xp: 1540, flag: '🇰🇷', streak: 12 },
    { rank: 8, name: 'Li Wei', xp: 1380, flag: '🇨🇳', streak: 8 },
    { rank: 9, name: 'You', xp: 1250, flag: '🇺🇸', streak: 5 },
    { rank: 10, name: 'Anna Kowalski', xp: 1120, flag: '🇵🇱', streak: 3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#0f1419] text-white overflow-hidden">
      <Sidebar />
      <HeaderBar />
      
      <div className="ml-64 mr-80 flex flex-col items-center justify-start min-h-screen pt-8 px-4">
        {/* Header */}
        <div className="w-full max-w-4xl mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">🏆 Leaderboard</h1>
          <p className="text-gray-400 text-lg">See how you rank against other learners</p>
        </div>

        {/* Leaderboard */}
        <div className="w-full max-w-4xl bg-gradient-to-br from-[#1e2d3a] to-[#2a3f52] rounded-2xl p-8">
          <div className="space-y-4">
            {leaderboardData.map((user, index) => (
              <div
                key={index}
                className={`
                  flex items-center justify-between p-4 rounded-xl transition-all duration-200
                  ${user.name === 'You' 
                    ? 'bg-[#b9e937] text-[#14213d] font-bold' 
                    : 'bg-[#2c394b] hover:bg-[#3a4a5c]'
                  }
                  ${index < 3 ? 'ring-2 ring-yellow-400' : ''}
                `}
              >
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-8 h-8">
                    {index === 0 && <span className="text-2xl">🥇</span>}
                    {index === 1 && <span className="text-2xl">🥈</span>}
                    {index === 2 && <span className="text-2xl">🥉</span>}
                    {index > 2 && <span className="font-bold text-lg">{user.rank}</span>}
                  </div>
                  
                  {/* Flag */}
                  <span className="text-2xl">{user.flag}</span>
                  
                  {/* Name */}
                  <span className="font-semibold text-lg">{user.name}</span>
                </div>
                
                <div className="flex items-center space-x-6">
                  {/* Streak */}
                  <div className="flex items-center space-x-1">
                    <span className="text-lg">🔥</span>
                    <span className="font-bold">{user.streak}</span>
                  </div>
                  
                  {/* XP */}
                  <div className="flex items-center space-x-1">
                    <span className="text-lg">⭐</span>
                    <span className="font-bold">{user.xp.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Achievement Message */}
          <div className="mt-8 text-center p-6 bg-[#1e2d3a] rounded-xl">
            <h3 className="text-xl font-bold mb-2">Keep Learning!</h3>
            <p className="text-gray-400">
              Complete more lessons to climb the leaderboard and earn more XP points!
            </p>
          </div>
        </div>
      </div>
      
      <RightSidebar />
      <FooterLinks />
    </div>
  );
};

export default Leaderboard;
