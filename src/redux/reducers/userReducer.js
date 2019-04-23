const userReducer = (state = {
    userLogged:false,
    user:{}
},action)=>{
    switch (action.type){
        case "SET_USERNAME":
        state = {
            ...state,
            userLogged:true,
            user:{
                name:action.payload
            }
        }
        break;
    }
    return state;
} 
export default userReducer;
