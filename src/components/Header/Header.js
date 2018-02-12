import React from 'react';
import searchIcon from '../../shared/images/search.svg';
import FormProgress from '../FormProgress';

const Header = ({ gotoLanding, formProgress }) => (
  <header className="app-header">
    <div className="app-title">
      <h2
        onClick={() => {
          gotoLanding && gotoLanding();
        }}
      >
        SPACED
      </h2>
    </div>
    {!formProgress && (
      <React.Fragment>
        <div className="top-nav">
          <span className="menu-item">HOME</span>
          <span className="menu-item">THE DESTINATIONS</span>
          <span className="menu-item">THE EXPERIENCE</span>
          <span className="menu-item">ABOUT</span>
        </div>
        <div className="search-control">
          <img src={searchIcon} alt="search icon" />
        </div>
      </React.Fragment>
    )}
    {formProgress && (
      <React.Fragment>
        <FormProgress value={formProgress} />
      </React.Fragment>
    )}
  </header>
);

export default Header;
