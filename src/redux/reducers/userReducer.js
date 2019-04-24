const userReducer = (state = {
    userLogged:true,
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

        case "LOGIN":
        state = {
            ...state,
            userLogged:true
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
