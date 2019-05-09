const createShop = ()=>{
    return (dispatch,getState,{getFirestore})=>{
        const firestore = getFirestore();
        let name = getState().order.shopName;
        let location = "VNB";
        let createdBy = getState().user.user.uid;
        let shop = {name,location,createdBy};
        firestore.collection('shops').add(shop).then(()=>{
            dispatch({type:"SHOP_CREATED",payload:shop})
        })
    }
}
export {createShop};