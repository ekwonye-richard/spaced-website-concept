import React from 'react';

const Button = ({ children, onClick }) => (
  <div onClick={onClick} className="control-wrapper mint-control btn">
    {children}
    <span className="ctrl-top" />
    <span className="ctrl-bottom" />
  </div>
);

export default Button;
