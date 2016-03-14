import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import shell from './shell';
import {reducer as form} from 'redux-form';

const rootReducer = combineReducers({
  form,
  shell,
  routing
});

export default rootReducer;
