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
    }
    return state;
} 
export default userReducer;
