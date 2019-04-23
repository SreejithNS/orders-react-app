import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';

const store = createStore(combineReducers({userReducer,uiReducer}),{},applyMiddleware(logger));

export default store;