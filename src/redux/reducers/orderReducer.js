const orderReducer = (state={
    itemsList:[],
    totalAmount:0,
    shop:{},
    shopName:""
},action)=>{
    switch(action.type){
        case 'STORE_ORDER':
        state = {...state,itemsList:action.payload }
        break;

        case 'MODIFY_ORDER':
        state = {...state,...action.payload}
        break;

        case 'SET_SHOP':
        state = {...state,shop:action.payload}
        break;

        case 'SET_SHOP_NAME':
        state = {...state,shopName:action.payload}
        break;

        case 'SHOP_CREATED':
        state = {...state,shop:action.payload}
        break;


        default:
        break;
    }
    return state
}
export default orderReducer;