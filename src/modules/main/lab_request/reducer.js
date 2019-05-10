import { fromJS } from 'immutable';

import { TEST } from './constants';

const initialState = fromJS({
  currentStep: 0
});

function createLabRequestReducer(state = initialState, action) {
  if (action.type === TEST) {
    return state.setIn(['currentStep'], action.payload);
  }

  return state;
}

export default createLabRequestReducer;
