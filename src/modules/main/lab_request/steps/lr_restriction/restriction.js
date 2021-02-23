import React from 'react';
import { Redirect } from 'react-router-dom';
import { LR_STEP_PROGRESS, LR_REQUEST_TYPE } from 'modules/main/lab_request/steps/constants';

class Restriction {
  constructor(stepNumber) {
    this.hasAccess = false;
    this.stepProgress = sessionStorage.getItem(LR_STEP_PROGRESS) || 1;

    

    if(this.stepProgress) {
      if(stepNumber <= this.stepProgress)
        this.hasAccess = true;

      if(sessionStorage.getItem(LR_REQUEST_TYPE) === 'edit')
        this.hasAccess = true;
    }

    // @ts-ignore
    if(sessionStorage.getItem(LR_REQUEST_TYPE) === 'create'){
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