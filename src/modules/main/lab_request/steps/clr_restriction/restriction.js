import React from 'react';
import { Redirect } from 'react-router-dom';
import { CLR_STEP_PROGRESS } from '../constants';

class Restriction {
  constructor(stepNumber) {
    this.hasAccess = false;
    this.stepProgress = sessionStorage.getItem(CLR_STEP_PROGRESS) || 1;

    if(this.stepProgress) {
      if(stepNumber <= this.stepProgress)
        this.hasAccess = true;
    }
  }

  redirect = () => (
    <Redirect to={`/request/step/${this.stepProgress}`} />
  );
}

export default Restriction;