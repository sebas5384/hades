import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import shell from './shell';
import group from './group';
import {reducer as form} from 'redux-form';

const rootReducer = combineReducers({
  form,
  shell,
  group,
  routing
});

export default rootReducer;
