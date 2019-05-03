const userReducer = (state = {
    userLogged:false,
    user:{}
},action)=>{
    switch (action.type){
        case "SET_USERNAME":
        state = {
            ...state,
            user:{
                name:action.payload
            }
        }
        break;

        case "USER_LOGGED":
        state = {
            ...state,
            userLogged:true,
            user:action.payload
        }
        break;
        case "LOGOUT":
        state = {
            ...state,
            userLogged:false
        }
        break;
    }
    return state;
} 
export default userReducer;
