import React from 'react';
import Navbar from '../components/Navbar';
import ProgressTree from '../components/ProgressTree';
import StreakCounter from '../components/StreakCounter';
import BadgeDisplay from '../components/BadgeDisplay';
import Footer from '../components/Footer';
import mascot from '../assets/mascot.svg';

const Home = () => (
  <div className="min-h-screen bg-bgLight flex flex-col">
    <Navbar />
    <main className="flex flex-col items-center flex-1 px-4 py-8">
      <img src={mascot} alt="Mascot" className="w-32 h-32 mb-6 animate-bounce" />
      <ProgressTree />
      <StreakCounter streak={7} />
      <BadgeDisplay />
    </main>
    <Footer />
  </div>
);

export default Home; 