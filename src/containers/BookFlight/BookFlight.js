import React, { Component } from 'react';
import Header from '../../components/Header';

class BookFlight extends Component {
  constructor() {
    super();
    this.state = {
      formProgress: 2
    };
  }
  render() {
    const { gotoLanding } = this.props;
    const { formProgress } = this.state;

    return (
      <div className="content-wrapper">
        <Header gotoLanding={gotoLanding} formProgress={formProgress} />
      </div>
    );
  }
}

export default BookFlight;
