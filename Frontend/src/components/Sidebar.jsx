import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { name: 'LEARN', icon: '🏠', active: true },
    { name: 'LETTERS', icon: 'क', active: false },
    { name: 'LEADERBOARDS', icon: '🏆', active: false },
    { name: 'QUESTS', icon: '�', active: false },
    { name: 'SHOP', icon: '🛒', active: false },
    { name: 'PROFILE', icon: '👤', active: false },
    { name: 'MORE', icon: '⋯', active: false },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#14213d] flex flex-col z-20">
      {/* Logo */}
      <div className="p-6 pb-8">
        <h1 className="text-[#b9e937] text-3xl font-bold">duolingo</h1>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`
                w-full flex items-center px-4 py-4 rounded-xl text-left transition-all duration-200 relative
                ${item.active 
                  ? 'bg-[#25304a] text-white font-bold border-l-4 border-[#1cb0f6]' 
                  : 'text-white hover:bg-[#1c2a42]'
                }
              `}
              aria-label={item.name}
            >
              <span className="text-xl mr-4 w-6 flex justify-center">{item.icon}</span>
              <span className="text-sm font-medium tracking-wide">{item.name}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar; 