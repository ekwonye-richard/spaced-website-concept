import React from 'react';
import Select from '../Select';
import Button from '../Button';

const LandingForm = ({ onSubmit }) => (
  <div className="landing-form">
    <div className="mega-text">
      TO SPACE <br />
      AND BACK, <br />
      SAFELY.
    </div>
    <div className="form-group">
      <Select default="1 adult" />
      <Select default="Mars" />
      <Button>GO</Button>
    </div>
    <div className="hero-footer">
      <div className="info-col">
        <h4>NEW DESTINATION</h4>
        <div>Anouncing that we fly to the moon.</div>
      </div>
      <div className="info-col">
        <h4>NEW DISCOUNT</h4>
        <div>To mars and back for $199 whut?!</div>
      </div>
      <div className="info-col">
        <h4>ABOUT THE SUITS</h4>
        <div>Our spacesuits are made by nike.</div>
      </div>
    </div>
  </div>
);

export default LandingForm;
