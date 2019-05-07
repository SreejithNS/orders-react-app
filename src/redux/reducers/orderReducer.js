const orderReducer = (state={
    itemsList:[]
},action)=>{
    switch(action.type){
        case 'STORE_ORDER':
        state = {...state,itemsList:action.payload }
        break;
        default:
        break;
    }
    return state
}
export default orderReducer;