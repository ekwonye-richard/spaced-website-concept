import React, { Component } from 'react';
import MainLoader from '../../components/MainLoader';
import Landing from '../Landing';
import BookDate from '../BookDate';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      progress: 'loading'
    };

    this.gotoBooking = this.gotoBooking.bind(this);
    this.gotoLanding = this.gotoLanding.bind(this);
  }

  gotoLanding() {
    this.setState({ progress: 'landing' });
  }

  gotoBooking() {
    this.setState({ exitLanding: true });

    this.exitLandingTimeout = setTimeout(() => {
      this.setState({
        progress: 'bookDate',
        exitLanding: false
      });
    }, 700);
  }

  componentDidMount() {
    this.landingTimeout = setTimeout(() => {
      this.setState({ progress: 'landing' });
    }, 2800);
  }

  componentWillUnmount() {
    clearTimeout(this.landingTimeout);
    clearTimeout(this.exitLandingTimeou);
  }

  render() {
    const { progress } = this.state;

    return (
      <div className="main-container">
        {progress === 'loading' && <MainLoader />}

        {(progress === 'loading' || progress === 'landing') && (
          <Landing
            gotoNext={this.gotoBooking}
            isLoading={progress === 'loading'}
            beginExit={this.state.exitLanding}
          />
        )}

        {progress === 'bookDate' && <BookDate gotoLanding={this.gotoLanding} />}
      </div>
    );
  }
}

export default Main;
