import React from 'react';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';
import SectionBanner from '../components/SectionBanner';
import LearningPath from '../components/LearningPath';
import RightSidebar from '../components/RightSidebar';
import FooterLinks from '../components/FooterLinks';

const Dashboard = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#0f1419] text-white overflow-hidden">
    {/* Left Sidebar */}
    <Sidebar />
    
    {/* Header Bar */}
    <HeaderBar />
    
    {/* Main Content Area */}
    <div className="ml-64 mr-80 flex flex-col items-center justify-start min-h-screen pt-8">
      {/* Section Banner */}
      <SectionBanner />
      
      {/* Learning Path */}
      <LearningPath />
    </div>
    
    {/* Right Sidebar */}
    <RightSidebar />
    
    {/* Footer Links */}
    <FooterLinks />
    
    {/* Responsive Mobile Layout */}
    <div className="md:hidden flex flex-col min-h-screen bg-[#0f1419] p-4">
      <div className="text-center text-white">
        <h1 className="text-2xl font-bold mb-4">LingoBuddy</h1>
        <p className="text-gray-400">Please use a larger screen for the best experience</p>
      </div>
    </div>
  </div>
);

export default Dashboard; 