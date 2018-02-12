import React from 'react';

const PROGRESS_CLASSES = {
  1: 'is-first',
  2: 'is-second',
  3: 'is-third',
  4: 'is-fourth'
};

const FormProgress = ({ value }) => (
  <div className="form-progress">
    <div className={`progress-rows ${PROGRESS_CLASSES[value]}`}>
      <span />
      <span />
      <span />
      <span />
    </div>
    <span className="progress-indicator" />
  </div>
);

export default FormProgress;
