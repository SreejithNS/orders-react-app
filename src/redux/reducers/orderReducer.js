const initialState={
    itemsList:[],
    totalAmount:0,
    shop:{},
    shopName:"",
    bill:{},
    suggestionsList:[]
}

const orderReducer = (state={
    itemsList:[],
    totalAmount:0,
    shop:{},
    shopName:"",
    bill:{}
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

        case 'UNSET_SHOP':
        state = {...state,shop:{}}
        break;


        case 'SET_SHOP_NAME':
        state = {...state,shopName:action.payload}
        break;

        case 'SHOP_CREATED':
        state = {...state,shop:action.payload}
        break;

        case 'SUGGESTIONS_PROCESS':
        state = {...state,suggestionsList:action.payload}
        break;

        case 'SET_BILL':
        state = {...state,bill:action.payload}
        break;

        case 'BILL_SENT':
        state = {...initialState}
        break;

        default:
        break;
    }
    return state
}
export default orderReducer;