import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Navbar = () => (
  <nav className="flex items-center justify-between bg-green rounded-2xl shadow-lg px-6 py-3 mt-4 mx-4">
    <div className="flex items-center gap-2">
      <img src={logo} alt="LingoBuddy Logo" className="w-10 h-10" />
      <span className="text-white text-2xl font-bold tracking-wide">LingoBuddy</span>
    </div>
    <ul className="flex gap-6 text-white text-lg font-medium">
      <li><Link to="/" className="hover:text-yellow transition-colors cursor-pointer">Home</Link></li>
      <li><Link to="/lessons" className="hover:text-yellow transition-colors cursor-pointer">Lessons</Link></li>
      <li><Link to="/dashboard" className="hover:text-yellow transition-colors cursor-pointer">Dashboard</Link></li>
      <li><Link to="/profile" className="hover:text-yellow transition-colors cursor-pointer">Profile</Link></li>
    </ul>
  </nav>
);

export default Navbar; 