import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import store from './redux/store';
import {Provider} from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import firebase from './config/firebaseConfig';
import 'typeface-roboto';

store.subscribe(()=>{
    return true
});
store.firebaseAuthIsReady.then(()=>{
    firebase.auth().onAuthStateChanged(user => {
        if(user){
            document.getElementById('loading-log').innerText="Welcome back "+user.displayName;
            store.firestore.collection('users').doc(user.uid).get().then(doc=>{
                if(!doc.exists){
                    return document.getElementById('loading-log').innerText="YOUR ACCOUNT IS BEING CREATED OR MAY BE LACKING VERIFICATION";
                }else{
                    document.getElementById('loading-log').innerText="PROFILE IS BEIGN LOADED";
                    store.dispatch({type:'USER_LOGGED',payload:{...doc.data(),uid:user.uid}});
                    store.dispatch({
                        type:"SET_SETTINGS",
                        payload:doc.data().settings
                    })
                    ReactDOM.render(
                        <Provider store={store}>
                            <Router>
                                <CssBaseline />
                                <App />
                            </Router>
                        </Provider>
                    , document.getElementById('root'));
                    var elem = document.querySelector('#splash')
                    elem.parentNode.removeChild(elem)
                }
            })
        }else{
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then((user)=>{
                return document.getElementById('loading-log').innerText="Welcome "+user.displayName;
            })
        }
    });
})


//Binoy edited this file
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
