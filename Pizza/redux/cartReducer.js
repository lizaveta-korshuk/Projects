import {SET_INITIAL,ADD_ITEM, DELETE_ITEM, DELETE_LAST_ITEM} from './cartAC';

const initState={
    items: [],
    totalAmount: 0,
    state: 'initiated',
  };

  function cartReducer(state=initState,action){
    switch (action.type){

      case ADD_ITEM:{

        let newState={...state, items:[...state.items]}

        let itemExistedBefore = newState.items.find(item => item.key===action.newItemInfo.key&&item.size===action.newItemInfo.size)
    
        if(itemExistedBefore!==undefined){
            itemExistedBefore.price=Number((itemExistedBefore.price+(itemExistedBefore.price/itemExistedBefore.count)).toFixed(1));
            itemExistedBefore.count=itemExistedBefore.count+1;
        }else{
            newState.items.push({key:action.newItemInfo.key, name:action.newItemInfo.name, price: action.newItemInfo.price, count: 1, size: action.newItemInfo.size})
        }

        let totalAmount = 0;
        newState.items.forEach(item => totalAmount=Number((totalAmount+item.price).toFixed(1)));
        newState.totalAmount = totalAmount;
        return newState;
      }

      case DELETE_ITEM:{

        if(action.deletedItemInfo==='all'){
          return {items: [], totalAmount: 0};
        }
        let newState={...state, items:[...state.items]}

        let itemExistedBefore = newState.items.find(item => item.key===action.deletedItemInfo.key&&item.size===action.deletedItemInfo.size)

        itemExistedBefore.price=Number((itemExistedBefore.price-(itemExistedBefore.price/itemExistedBefore.count)).toFixed(1));
        itemExistedBefore.count=itemExistedBefore.count-1;

        let totalAmount = 0;
        newState.items.forEach(item => totalAmount=Number((totalAmount+item.price).toFixed(1)));
        newState.totalAmount = totalAmount;
        return newState;
      }

      case DELETE_LAST_ITEM:  {
        let newState={...state, items:[...state.items]}
        let itemExistedBefore = newState.items.find(item => item.key===action.deletedItemInfo.key&&item.size===action.deletedItemInfo.size)
        let index = newState.items.indexOf(itemExistedBefore);
        newState.items.splice(index,1)

        let totalAmount = 0;
        newState.items.forEach(item => totalAmount=Number((totalAmount+item.price).toFixed(1)));
        newState.totalAmount = totalAmount;
        return newState;         
      }

      case SET_INITIAL: {
        let newState = action.cartItems;
        newState.state='withDataFromAjax'
        return newState;
      }

      default:{
        return state;
      }
    }
  }

  export default cartReducer;