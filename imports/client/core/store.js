'use strict';
import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

const enhancers = [
  applyMiddleware(ReduxThunk, logger)
]

//create store with rootReducer, empty initial state, and extend our store with enhancers
const store = createStore(rootReducer, {}, compose(...enhancers));

//so we can access the store from the browser console for easy debugging
window.store = store;

export default store;
