const signIn = () =>{
    return (dispatch,getState,{getFirebase})=>{
        const firebase = getFirebase();
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var user = result.user;
            var uid = user.uid;
            var name = user.displayName;
            dispatch({
                type:"USER_LOGGED",
                payload:{uid,name}
            })
    })
}
}
const signOut = () =>{
    return (dispatch,getState,{getFirebase})=>{
        const firebase = getFirebase();
        firebase.auth().signOut().then(function() {
            dispatch({
                type:"USER_LOGGED_OUT"
            })
        })
}
}

export {signIn,signOut}