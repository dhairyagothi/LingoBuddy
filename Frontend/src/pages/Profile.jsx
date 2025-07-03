import React from 'react';
import Navbar from '../components/Navbar';
import BadgeDisplay from '../components/BadgeDisplay';
import Footer from '../components/Footer';
import mascot from '../assets/mascot.svg';

const Profile = () => (
  <div className="min-h-screen bg-bgLight flex flex-col">
    <Navbar />
    <main className="flex flex-col items-center flex-1 px-4 py-8">
      <img src={mascot} alt="Mascot" className="w-28 h-28 mb-6 animate-bounce" />
      <BadgeDisplay />
    </main>
    <Footer />
  </div>
);

export default Profile; 