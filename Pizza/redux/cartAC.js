const SET_INITIAL = 'SET_INITIAL';
const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const DELETE_LAST_ITEM = 'DELETE_LAST_ITEM';

const set_initial=function(cartItems){
    return{
        type:SET_INITIAL,
        cartItems:cartItems,
    };
}

const add_item=function(newItemInfo){
    return{
        type:ADD_ITEM,
        newItemInfo:newItemInfo,
    };
}

const delete_item=function(deletedItemInfo){
    return{
        type:DELETE_ITEM,
        deletedItemInfo:deletedItemInfo,
    };
}

const delete_last_item=function(deletedItemInfo){
    return{
        type:DELETE_LAST_ITEM,
        deletedItemInfo:deletedItemInfo,
    };
}

export {
    add_item, ADD_ITEM,
    delete_item, DELETE_ITEM,
    delete_last_item, DELETE_LAST_ITEM,
    set_initial, SET_INITIAL,
}