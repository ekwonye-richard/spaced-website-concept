import React from 'react';
import MoonScene from '../../components/MoonScene';
import Header from '../../components/Header';
import LandingForm from '../../components/LandingForm';
import ScrollTrack from '../../components/ScrollTrack';

const Main = () => (
  <div className="main-container">
    <MoonScene />
    <div className="content-wrapper">
      <Header />
      <LandingForm />
      <div className="location-widget">
        <span className="loc-val">40.645477</span>,{' '}
        <span className="loc-val">-73.781187</span>
      </div>
      <div className="equalizer">
        <span />
        <span />
      </div>
      <ScrollTrack />
    </div>
  </div>
);

export default Main;
