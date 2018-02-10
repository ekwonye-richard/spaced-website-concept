import React from 'react';

const Button = ({ children }) => (
  <div className="control-wrapper mint-control btn">
    {children}
    <span className="ctrl-top" />
    <span className="ctrl-bottom" />
  </div>
);

export default Button;
