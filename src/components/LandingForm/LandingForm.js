import React from 'react';
import Select from '../Select';
import Button from '../Button';

const LandingForm = ({ onSubmit }) => (
  <div className="landing-form">
    <div className="mega-text">
      <div>
        TO SPACE <br />
        AND BACK, <br />
        SAFELY.
      </div>
    </div>
    <div className="form-group">
      <div>
        <Select default="1 adult" />
        <Select default="Mars" />
        <Button>GO</Button>
      </div>
    </div>
    <div className="hero-footer">
      <div className="info-col">
        <h5>NEW DESTINATION</h5>
        <div>Anouncing that we fly to the moon.</div>
      </div>
      <div className="info-col">
        <h5>NEW DISCOUNT</h5>
        <div>To mars and back for $199 whut?!</div>
      </div>
      <div className="info-col">
        <h5>ABOUT THE SUITS</h5>
        <div>Our spacesuits are made by nike.</div>
      </div>
    </div>
  </div>
);

export default LandingForm;
