import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import user from './reducers/userReducer';
import ui from './reducers/uiReducer';

const store = createStore(combineReducers({user,ui}),{},applyMiddleware(logger));

export default store;