import React from 'react';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';
import RightSidebar from '../components/RightSidebar';
import FooterLinks from '../components/FooterLinks';

const More = () => {
  const moreOptions = [
    {
      title: 'Settings',
      description: 'Manage your account and preferences',
      icon: '⚙️',
      path: '/settings'
    },
    {
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: '❓',
      path: '/help'
    },
    {
      title: 'Privacy Policy',
      description: 'Learn how we protect your data',
      icon: '🔒',
      path: '/privacy'
    },
    {
      title: 'Terms of Service',
      description: 'Read our terms and conditions',
      icon: '📋',
      path: '/terms'
    },
    {
      title: 'About LingoBuddy',
      description: 'Learn more about our mission',
      icon: 'ℹ️',
      path: '/about'
    },
    {
      title: 'Rate Us',
      description: 'Share your feedback on the app store',
      icon: '⭐',
      path: '/rate'
    }
  ];

  const handleOptionClick = (option) => {
    // For now, just show an alert
    alert(`Navigate to ${option.title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#0f1419] text-white overflow-hidden">
      <Sidebar />
      <HeaderBar />
      
      <div className="ml-64 mr-80 flex flex-col items-center justify-start min-h-screen pt-8 px-4">
        {/* Header */}
        <div className="w-full max-w-4xl mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">⋯ More</h1>
          <p className="text-gray-400 text-lg">Additional options and information</p>
        </div>

        {/* Options Grid */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {moreOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="bg-gradient-to-br from-[#1e2d3a] to-[#2a3f52] rounded-2xl p-6 transition-all duration-300 hover:scale-102 hover:shadow-xl cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <span className="text-4xl">{option.icon}</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                  <p className="text-gray-400">{option.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* App Information */}
        <div className="w-full max-w-4xl mt-12">
          <div className="bg-gradient-to-br from-[#1e2d3a] to-[#2a3f52] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">LingoBuddy</h2>
            <p className="text-gray-400 mb-4">Version 1.0.0</p>
            <p className="text-lg mb-6">
              Your friendly companion for learning languages! 
              Master new languages with fun, interactive lessons and quizzes.
            </p>
            
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <span>© 2025 LingoBuddy</span>
              <span>Made with ❤️ for language learners</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="w-full max-w-4xl mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-[#b9e937] text-[#14213d] py-3 px-4 rounded-xl font-bold hover:bg-[#a8d429] transition-colors cursor-pointer">
              Share App
            </button>
            <button className="bg-[#1cb0f6] text-white py-3 px-4 rounded-xl font-bold hover:bg-[#1a9bd8] transition-colors cursor-pointer">
              Invite Friends
            </button>
            <button className="bg-[#ff4757] text-white py-3 px-4 rounded-xl font-bold hover:bg-[#e63946] transition-colors cursor-pointer">
              Reset Progress
            </button>
            <button className="bg-[#5f27cd] text-white py-3 px-4 rounded-xl font-bold hover:bg-[#4834d4] transition-colors cursor-pointer">
              Export Data
            </button>
          </div>
        </div>
      </div>
      
      <RightSidebar />
      <FooterLinks />
    </div>
  );
};

export default More;
