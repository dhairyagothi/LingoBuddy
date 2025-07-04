import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';
import LearningPath from '../components/LearningPath';
import RightSidebar from '../components/RightSidebar';
import FooterLinks from '../components/FooterLinks';

const LanguagePage = () => {
  const { languageId } = useParams();
  const navigate = useNavigate();
  
  const languageData = {
    spanish: { name: 'Spanish', flag: '🇪🇸', greeting: '¡Hola!' },
    french: { name: 'French', flag: '🇫🇷', greeting: 'Bonjour!' },
    german: { name: 'German', flag: '🇩🇪', greeting: 'Hallo!' },
    italian: { name: 'Italian', flag: '🇮🇹', greeting: 'Ciao!' },
    portuguese: { name: 'Portuguese', flag: '🇧🇷', greeting: 'Olá!' },
    japanese: { name: 'Japanese', flag: '🇯🇵', greeting: 'こんにちは!' },
    korean: { name: 'Korean', flag: '🇰🇷', greeting: '안녕하세요!' },
    chinese: { name: 'Chinese', flag: '🇨🇳', greeting: '你好!' }
  };

  const currentLanguage = languageData[languageId];

  if (!currentLanguage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#0f1419] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Language Not Found</h1>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-[#b9e937] text-[#14213d] font-bold px-8 py-3 rounded-xl hover:bg-[#a8d429] transition-colors cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#0f1419] text-white overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar />
      
      {/* Header Bar */}
      <HeaderBar currentLanguage={currentLanguage} />
      
      {/* Main Content Area */}
      <div className="ml-64 mr-80 flex flex-col items-center justify-start min-h-screen pt-8 px-4">
        {/* Language Header */}
        <div className="w-full max-w-4xl mb-8 text-center">
          <div className="bg-gradient-to-r from-[#1e2d3a] to-[#2a3f52] rounded-2xl p-8 mb-6">
            <div className="text-8xl mb-4">{currentLanguage.flag}</div>
            <h1 className="text-4xl font-bold mb-2">{currentLanguage.name}</h1>
            <p className="text-2xl text-[#b9e937] font-semibold">{currentLanguage.greeting}</p>
            <p className="text-gray-400 mt-2">Start your {currentLanguage.name} learning journey</p>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <button 
              onClick={() => navigate(`/quiz/${languageId}`)}
              className="bg-[#b9e937] text-[#14213d] font-bold py-4 px-6 rounded-xl hover:bg-[#a8d429] transition-colors cursor-pointer"
            >
              📝 Take Quiz
            </button>
            <button 
              onClick={() => navigate(`/lessons/${languageId}`)}
              className="bg-[#1cb0f6] text-white font-bold py-4 px-6 rounded-xl hover:bg-[#1a9bd8] transition-colors cursor-pointer"
            >
              📚 View Lessons
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-[#ff4757] text-white font-bold py-4 px-6 rounded-xl hover:bg-[#e63946] transition-colors cursor-pointer"
            >
              🏠 Dashboard
            </button>
          </div>
        </div>

        {/* Learning Path */}
        <div className="w-full max-w-4xl">
          <LearningPath selectedLanguage={languageId} />
        </div>
      </div>
      
      {/* Right Sidebar */}
      <RightSidebar />
      
      {/* Footer Links */}
      <FooterLinks />
    </div>
  );
};

export default LanguagePage;
