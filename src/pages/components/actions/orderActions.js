const deleteOrder = (id)=>{
    return (dispatch,getState,{getFirestore})=>{
        const firestore = getFirestore();
        firestore.collection('orders').doc(id).delete().then(()=>{
            dispatch({type:"ORDER_DELETED"})
        })
    }
}

export {deleteOrder};