import {combineReducers} from 'redux';

import cartReducer from './cartReducer';

let combinedReducer = combineReducers({
    cart: cartReducer,
})

export default combinedReducer;