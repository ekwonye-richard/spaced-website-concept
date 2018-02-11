import React, { Component } from 'react';
import Landing from '../Landing';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      progress: 'loading'
    };
  }

  render() {
    return (
      <div className="main-container">
        <Landing />
      </div>
    );
  }
}

export default Main;
