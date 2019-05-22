const settingsReducer = (state={
    pricelist:"",
    location:""
},action)=>{
    switch(action.type){
        case 'SET_SETTINGS':
        state = {...state,...action.payload}
        break;
        case 'SETTINGS_SET_LOCATION':
        state = {...state,location:action.payload}
        break;
    }
    return state
}
export default settingsReducer;