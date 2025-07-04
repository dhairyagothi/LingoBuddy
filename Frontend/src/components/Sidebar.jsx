import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { name: 'LEARN', icon: '🏠', active: false, path: '/dashboard' },
    { name: 'LETTERS', icon: 'क', active: false, path: '/lessons' },
    { name: 'LEADERBOARDS', icon: '🏆', active: false, path: '/leaderboard' },
    { name: 'QUESTS', icon: '🎯', active: false, path: '/quests' },
    { name: 'SHOP', icon: '🛒', active: false, path: '/shop' },
    { name: 'PROFILE', icon: '👤', active: false, path: '/profile' },
    { name: 'MORE', icon: '⋯', active: false, path: '/more' },
  ];

  // Update active state based on current location
  const updatedMenuItems = menuItems.map(item => ({
    ...item,
    active: location.pathname === item.path || 
           (item.path === '/dashboard' && location.pathname === '/') ||
           (item.path === '/lessons' && location.pathname.startsWith('/lessons'))
  }));

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#14213d] flex flex-col z-20">
      {/* Logo */}
      <div className="p-6 pb-8">
        <h1 
          className="text-[#b9e937] text-3xl font-bold cursor-pointer hover:text-[#a8d429] transition-colors"
          onClick={handleLogoClick}
        >
          lingobuddy
        </h1>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {updatedMenuItems.map((item, index) => (
            <button
              key={index}
              className={`
                w-full flex items-center px-4 py-4 rounded-xl text-left transition-all duration-200 relative cursor-pointer
                ${item.active 
                  ? 'bg-[#25304a] text-white font-bold border-l-4 border-[#1cb0f6]' 
                  : 'text-white hover:bg-[#1c2a42]'
                }
              `}
              onClick={() => handleNavigation(item.path)}
              aria-label={item.name}
            >
              <span className="flex justify-center w-6 mr-4 text-xl">{item.icon}</span>
              <span className="text-sm font-medium tracking-wide">{item.name}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar; 