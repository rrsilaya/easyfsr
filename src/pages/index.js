import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

/**
 * Import your reducers here. (They are commonly inside duck.js.)
 */
import app from '../app/duck';
import users from '../pages/users/duck';
import fsr from '../pages/fsr/duck';

const reducers = combineReducers({
  router,
  app,
  users,
  fsr,
});

export default reducers;
