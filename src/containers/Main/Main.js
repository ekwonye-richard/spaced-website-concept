import React, { Component } from 'react';
import MainLoader from '../../components/MainLoader';
import Landing from '../Landing';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      progress: 'loading'
    };
  }

  componentDidMount() {
    this.landingTimeout = setTimeout(() => {
      this.setState({ progress: 'landing' });
    }, 2800);
  }

  componentWillUnmount() {
    clearTimeout(this.landingTimeout);
  }

  render() {
    const { progress } = this.state;

    return (
      <div className="main-container">
        {progress === 'loading' && <MainLoader />}

        {progress === 'landing' && <Landing />}
      </div>
    );
  }
}

export default Main;
