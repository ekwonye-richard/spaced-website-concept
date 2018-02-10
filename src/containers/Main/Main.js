import React from 'react';
import MoonScene from '../../components/MoonScene';
import Header from '../../components/Header';
import LandingForm from '../../components/LandingForm';

const Main = () => (
  <div className="main-container">
    <MoonScene />
    <div className="content-wrapper">
      <Header />
      <LandingForm />
    </div>
  </div>
);

export default Main;
