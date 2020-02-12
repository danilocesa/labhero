import React from 'react';
import { Redirect } from 'react-router-dom';
import { CLR_STEP_PROGRESS, REQUEST_TYPE } from '../constants';

class Restriction {
  constructor(stepNumber) {
    this.hasAccess = false;
    this.stepProgress = sessionStorage.getItem(CLR_STEP_PROGRESS) || 1;
    
    if(this.stepProgress) {
      if(stepNumber <= this.stepProgress)
        this.hasAccess = true;
    }

    // @ts-ignore
    if(sessionStorage.getItem(REQUEST_TYPE) === 'create'){
      this.link = `/request/create/step/${this.stepProgress}`;
    } else {  
      this.link = `/request/edit/step/${this.stepProgress}`;
    }
  }

  redirect = () => (
    <Redirect to={`${this.link}`} />
  );
}

export default Restriction;