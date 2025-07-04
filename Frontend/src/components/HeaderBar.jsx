import React from 'react';

const HeaderBar = () => {
  return (
    <div className="fixed top-0 right-0 mr-8 mt-6 z-30">
      <div className="flex space-x-4 items-center">
        {/* Learning Language Flag */}
        <div className="flex items-center space-x-2 bg-[#1e2d3a] rounded-lg px-3 py-2 cursor-pointer hover:bg-[#2a3f52] transition-colors">
          <span className="text-xl">�🇸</span>
          <span className="text-white text-sm font-medium">Spanish</span>
        </div>
        
        {/* Streak */}
        <div className="flex items-center space-x-1 bg-[#ff4757] rounded-lg px-2 py-1 cursor-pointer hover:bg-[#e63946] transition-colors">
          <span className="text-lg">🔥</span>
          <span className="text-white font-bold text-sm">0</span>
        </div>
        
        {/* Gems */}
        <div className="flex items-center space-x-1 bg-[#1cb0f6] rounded-lg px-2 py-1 cursor-pointer hover:bg-[#1a9bd8] transition-colors">
          <span className="text-lg">💎</span>
          <span className="text-white font-bold text-sm">500</span>
        </div>
        
        {/* Hearts */}
        <div className="flex items-center space-x-1 bg-[#ff4757] rounded-lg px-2 py-1 cursor-pointer hover:bg-[#e63946] transition-colors">
          <span className="text-lg">❤️</span>
          <span className="text-white font-bold text-sm">5</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
