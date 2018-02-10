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
      <div className="control-wrapper select-dropdown">
        <span>{this.state.selected}</span>
        <span className="ctrl-top" />
        <span className="ctrl-bottom" />
      </div>
    );
  }
}

export default Select;
