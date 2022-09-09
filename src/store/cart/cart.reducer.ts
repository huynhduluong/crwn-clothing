import { setIsCartOpen, setCartItem } from './cart.action';
import { AnyAction } from 'redux';
import { CartItem } from "./cart.types";

export type CartState = {
    cartItems: CartItem[],
    isCartOpen: boolean
}

const CART_INITIAL_STATE: CartState = {
    cartItems: [],
    isCartOpen: false,
}

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction) => {
    if (setIsCartOpen.match(action)) {
        return {
            ...state,
            cartItems: action.payload
        };
    }

    if (setCartItem.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload
        };
    }

    return state
}