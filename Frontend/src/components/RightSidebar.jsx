import React from 'react';

const RightSidebar = () => {
  return (
    <div className="fixed right-0 top-0 h-screen w-80 p-6 pt-20 z-10">
      <div className="flex flex-col space-y-6">
        {/* Leaderboards Card */}
        <div className="bg-[#19232c] rounded-xl border border-[#2c394b] p-6 text-white">
          <div className="flex items-start mb-4">
            <span className="text-3xl mr-4 mt-1">🔒</span>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Unlock Leaderboards!</h3>
              <div className="text-sm text-gray-300 flex items-center">
                <span className="mr-2">👤</span>
                <span>Complete 10 more lessons to start competing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Quests Card */}
        <div className="bg-[#19232c] rounded-xl border border-[#2c394b] p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <span className="text-3xl mr-3">⚡</span>
              <h3 className="text-lg font-bold">Daily Quests</h3>
            </div>
            <button className="text-[#1cb0f6] text-sm font-bold hover:underline">
              VIEW ALL
            </button>
          </div>
          
          <div className="flex items-center">
            <span className="text-2xl mr-4">⚡</span>
            <div className="flex-1">
              <div className="text-sm font-bold mb-2">Earn 10 XP</div>
              <div className="bg-[#232e3e] h-3 rounded-full overflow-hidden mb-1">
                <div className="bg-[#ffd700] h-full w-0 rounded-full"></div>
              </div>
              <div className="text-xs text-gray-400">0 / 10</div>
            </div>
            <div className="ml-4 bg-[#ff9500] rounded-lg p-2">
              <span className="text-2xl">🧙‍♀️</span>
            </div>
          </div>
        </div>

        {/* Profile Prompt Card */}
        <div className="bg-[#19232c] rounded-xl border border-[#2c394b] p-6 text-white">
          <h3 className="text-lg font-bold mb-6 text-center">Create a profile to save your progress!</h3>
          
          <div className="space-y-3">
            <button className="w-full bg-[#b9e937] text-[#14213d] font-bold py-3 px-4 rounded-xl hover:bg-[#a8d429] transition-colors text-sm tracking-wide">
              CREATE A PROFILE
            </button>
            <button className="w-full bg-[#1cb0f6] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#1a9fd4] transition-colors text-sm tracking-wide">
              SIGN IN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
