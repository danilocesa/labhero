import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({
  dashboard: null,
  labResult: null
}));

export default store;