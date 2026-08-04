import React from 'react';
import '../../pages/Home/Home.css'; // Or a separate Footer.css

const Footer = () => {
  return (
    <footer>
      <div className="wrap foot-row">
        <span>© 2026 AlgoAtlas</span>
        <span>Curated from the LeetCode discuss list · built for people who read the pattern, not the tag</span>
      </div>
    </footer>
  );
};

export default Footer;
