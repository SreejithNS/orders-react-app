const createShop = ()=>{
    return (dispatch,getState,{getFirestore})=>{
        const firestore = getFirestore();
        let name = getState().order.shopName;
        let location = getState().settings.location;
        let createdBy = getState().user.user.uid;
        let createdUser = getState().user.user.name;
        let shop = {name,location,createdBy,createdUser};
        firestore.collection('shops').add(shop).then(()=>{
            dispatch({type:"SHOP_CREATED",payload:shop})
        })
    }
}
const sendBill = ()=>{
    return (dispatch,getState,{getFirestore})=>{
        const firestore = getFirestore();
        let bill = getState().order.bill;
        firestore.collection('orders').add(bill).then(()=>{
            dispatch({type:"BILL_SENT"})
        })
    }
}
export {createShop,sendBill};