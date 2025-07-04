import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';
import SectionBanner from '../components/SectionBanner';
import LearningPath from '../components/LearningPath';
import RightSidebar from '../components/RightSidebar';
import FooterLinks from '../components/FooterLinks';

const Dashboard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('spanish');
  const navigate = useNavigate();
  
  const languages = [
    { 
      id: 'spanish', 
      name: 'Spanish', 
      flag: '🇪🇸', 
      level: 'Beginner',
      progress: 15,
      description: 'Learn the world\'s second most spoken language'
    },
    { 
      id: 'french', 
      name: 'French', 
      flag: '🇫🇷', 
      level: 'Beginner',
      progress: 0,
      description: 'Discover the language of love and culture'
    },
    { 
      id: 'german', 
      name: 'German', 
      flag: '🇩🇪', 
      level: 'Beginner',
      progress: 0,
      description: 'Master the language of innovation'
    },
    { 
      id: 'italian', 
      name: 'Italian', 
      flag: '🇮🇹', 
      level: 'Beginner',
      progress: 0,
      description: 'Learn the beautiful language of art and cuisine'
    },
    { 
      id: 'portuguese', 
      name: 'Portuguese', 
      flag: '🇧🇷', 
      level: 'Beginner',
      progress: 0,
      description: 'Explore the language of Brazil and Portugal'
    },
    { 
      id: 'japanese', 
      name: 'Japanese', 
      flag: '🇯🇵', 
      level: 'Beginner',
      progress: 0,
      description: 'Dive into the fascinating world of Japanese'
    },
    { 
      id: 'korean', 
      name: 'Korean', 
      flag: '🇰🇷', 
      level: 'Beginner',
      progress: 0,
      description: 'Learn the language of K-pop and innovation'
    },
    { 
      id: 'chinese', 
      name: 'Chinese', 
      flag: '🇨🇳', 
      level: 'Beginner',
      progress: 0,
      description: 'Master the world\'s most spoken language'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#0f1419] text-white overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar />
      
      {/* Header Bar */}
      <HeaderBar />
      
      {/* Main Content Area */}
      <div className="ml-64 mr-80 flex flex-col items-center justify-start min-h-screen pt-8 px-4">
        {/* Welcome Section */}
        <div className="w-full max-w-4xl mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">Choose Your Language</h1>
          <p className="text-gray-400 text-center text-lg">Start your language learning journey with LingoBuddy</p>
        </div>

        {/* Language Grid */}
        <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {languages.map((language) => (
            <div
              key={language.id}
              className={`
                relative bg-gradient-to-br from-[#1e2d3a] to-[#2a3f52] rounded-2xl p-6 transition-all duration-300 cursor-pointer
                ${selectedLanguage === language.id 
                  ? 'ring-4 ring-[#b9e937] scale-105 shadow-2xl' 
                  : 'hover:scale-102 hover:shadow-xl'
                }
              `}
              onClick={() => setSelectedLanguage(language.id)}
              onDoubleClick={() => navigate(`/language/${language.id}`)}
            >
              {/* Flag */}
              <div className="text-center mb-4">
                <span className="text-6xl">{language.flag}</span>
              </div>
              
              {/* Language Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{language.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{language.description}</p>
                
                {/* Level Badge */}
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#b9e937] text-[#14213d]">
                  {language.level}
                </div>
                
                {/* Progress Bar */}
                {language.progress > 0 && (
                  <div className="mt-3">
                    <div className="bg-[#2c394b] rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-[#b9e937] h-full transition-all duration-500"
                        style={{ width: `${language.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{language.progress}% Complete</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Continue Learning Section */}
        <div className="w-full max-w-4xl">
          <SectionBanner selectedLanguage={selectedLanguage} />
          <LearningPath selectedLanguage={selectedLanguage} />
        </div>
      </div>
      
      {/* Right Sidebar */}
      <RightSidebar />
      
      {/* Footer Links */}
      <FooterLinks />
      
      {/* Responsive Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-screen bg-[#0f1419] p-4">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">LingoBuddy</h1>
          <p className="text-gray-400 mb-6">Choose your language to start learning</p>
          
          {/* Mobile Language List */}
          <div className="space-y-4">
            {languages.slice(0, 4).map((language) => (
              <div key={language.id} className="bg-[#1e2d3a] rounded-lg p-4 flex items-center">
                <span className="text-3xl mr-4">{language.flag}</span>
                <div className="text-left">
                  <h4 className="font-bold">{language.name}</h4>
                  <p className="text-sm text-gray-400">{language.level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 