let defaultState = {
    selectedItems: {items:[], CanteenName:"",}

}

let cartReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'ADD_TO_CART':{
            let newState = {...state};
            newState.selectedItems = {
                items: [...newState.selectedItems.items, action.payload],
                CanteenName: action.payload.CanteenName,
            };
        console.log(newState,"👉");
        return newState
        }

        default:
            return state;
    }
};

export default cartReducer;