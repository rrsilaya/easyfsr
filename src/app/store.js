import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { middleware as pack } from 'redux-pack';
import { routerMiddleware as router } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';
import reducers from '../pages';

export const history = createHistory();

const store = createStore(
  reducers,
  {},
  applyMiddleware(router(history), thunk, logger, pack),
);

export default store;
