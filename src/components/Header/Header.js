import React from 'react';
import searchIcon from '../../shared/images/search.svg';

const Header = () => (
  <header className="app-header">
    <div className="app-title">
      <h2>SPACED</h2>
    </div>
    <div className="top-nav">
      <span className="menu-item">HOME</span>
      <span className="menu-item">THE DESTINATIONS</span>
      <span className="menu-item">THE EXPERIENCE</span>
      <span className="menu-item">ABOUT</span>
    </div>
    <div className="search-control">
      <img src={searchIcon} alt="search icon" />
    </div>
  </header>
);

export default Header;
