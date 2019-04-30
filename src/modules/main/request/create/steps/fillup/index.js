import React from 'react';

import Tracker from '../../tracker';
import FillupForm from './form';
import Navigation from './navigation';

class FillupStep extends React.Component {
  render() {
    return (
      <div>
        <Tracker active={1} />
        <FillupForm />
        <Navigation />
      </div>
    );
  }
}

export default FillupStep;