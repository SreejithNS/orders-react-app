import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import user from './reducers/userReducer';
import ui from './reducers/uiReducer';
import order from './reducers/orderReducer';
import settings from './reducers/settingsReducer';
import { reduxFirestore,getFirestore } from 'redux-firestore';
import { reactReduxFirebase,getFirebase } from 'react-redux-firebase';
import thunk from "redux-thunk";
import {compose} from "redux"
import firebase from '../config/firebaseConfig';
import {firestoreReducer} from "redux-firestore";
import {firebaseReducer} from "react-redux-firebase"
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const store = createStore(combineReducers({
        user,
        ui,
        order,
        settings,
        firestore:firestoreReducer,
        firebase:firebaseReducer
    }),{},
    composeEnhancers(
        applyMiddleware(logger,thunk.withExtraArgument({getFirebase,getFirestore})),
        reduxFirestore(firebase),
        reactReduxFirebase(firebase,{useFirestoreForProfile:true,userProfile:'users',attachAuthIsReady:true})
    )
);


export default store;