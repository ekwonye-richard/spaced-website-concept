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
      <Button>Go</Button>
    </div>
  </div>
);

export default LandingForm;
