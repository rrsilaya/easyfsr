import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

/**
 * Import your reducers here. (They are commonly inside duck.js.)
 */
import app from '../app/duck';
import users from './users/duck';
import search from './facultySearch/duck';
import profile from './profile/duck';

const reducers = combineReducers({
  router,
  app,
  users,
  search,
  profile,
});

export default reducers;
