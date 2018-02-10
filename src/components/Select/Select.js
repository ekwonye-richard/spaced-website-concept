import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.default
    };
  }
  render() {
    return (
      <div className="control-wrapper select-wrapper">
        <span>{this.state.selected}</span>
      </div>
    );
  }
}

export default Select;
