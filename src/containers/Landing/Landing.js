import React from 'react';
import MoonScene from '../../components/MoonScene';
import Header from '../../components/Header';
import LandingForm from '../../components/LandingForm';
import ScrollTrack from '../../components/ScrollTrack';
import { isMobile, isWebGLEnabled } from '../../shared/utils';

const Landing = ({ isLoading, gotoNext, beginExit, gotoLanding }) => (
  <React.Fragment>
    {!isMobile() &&
      isWebGLEnabled() && (
        <MoonScene isReady={!isLoading} beginExit={beginExit} />
      )}
    <div
      className={`landing-wrapper content-wrapper ${
        isLoading ? 'hidden' : ''
      } ${beginExit ? 'begin-exit' : ''}`}
    >
      <Header />
      <LandingForm onSubmit={gotoNext} />
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
  </React.Fragment>
);

export default Landing;
