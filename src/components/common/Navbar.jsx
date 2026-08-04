import React from 'react';
import { Link } from 'react-router-dom';
import '../../pages/Home/Home.css'; // Importing from Home for now for styles, but ideally this would be scoped to Navbar

const Navbar = () => {
  return (
    <nav>
      <div className="brand">
        <div className="brand-mark">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4z" stroke="#08090f" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </div>
        AlgoAtlas
      </div>
      <div className="nav-links">
        <a href="#sheets">Sheets</a>
        <a href="#how">How it works</a>
        <a href="#difficulty">Coverage</a>
        <Link to="/login">Log in</Link>
      </div>
      <Link to="/signup" className="nav-cta">Sign up free →</Link>
    </nav>
  );
};

export default Navbar;
