import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import user from './reducers/userReducer';
import ui from './reducers/uiReducer';
import { reduxFirestore,getFirestore } from 'redux-firestore';
import { reactReduxFirebase,getFirebase } from 'react-redux-firebase';
import thunk from "redux-thunk";
import {compose} from "redux"
import firebaseConfig from '../config/firebaseConfig';
import {firestoreReducer} from "redux-firestore";
import {firebaseReducer} from "react-redux-firebase"

const store = createStore(combineReducers({user,ui,firestore:firestoreReducer,firebase:firebaseReducer}),{},
    compose(
        applyMiddleware(logger,thunk.withExtraArgument({getFirebase,getFirestore})),
        reduxFirestore(firebaseConfig),
        reactReduxFirebase(firebaseConfig)
    )
);

export default store;