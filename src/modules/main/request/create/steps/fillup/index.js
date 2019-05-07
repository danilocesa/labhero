import React from 'react';

import Tracker from '../../tracker';
import FillupForm from './form';
import Navigation from './navigation';

class FillupStep extends React.Component {
  state = {
    firstname: '',
    lastname: ''
  };

  handleOnChangeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <Tracker active={1} />
        <FillupForm onChangeInput={this.handleOnChangeInput} />
        <Navigation fields={this.state} />
      </div>
    );
  }
}

export default FillupStep;
