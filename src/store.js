import { createStore, combineReducers } from 'redux';
import createLabRequestReducer from './modules/main/lab_request/reducer';

const store = createStore(combineReducers({
  dashboard: null,
  labRequest: createLabRequestReducer,
  labResult: null
}));

export default store;