import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import {reducer as form} from 'redux-form';

const rootReducer = combineReducers({
  form,
  counter,
  routing
});

export default rootReducer;
