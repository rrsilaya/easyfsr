import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

/**
 * Import your reducers here. (They are commonly inside duck.js.)
 */
import app from '../app/duck';

const reducers = combineReducers({
  router,
  app,
});

export default reducers;
