const orderReducer = (state={
    itemsList:[],
    totalAmount:0
},action)=>{
    switch(action.type){
        case 'STORE_ORDER':
        state = {...state,itemsList:action.payload }
        break;
        case 'MODIFY_ORDER':
        state = {...state,...action.payload}
        break;
        default:
        break;
    }
    return state
}
export default orderReducer;