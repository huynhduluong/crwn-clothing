import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPE } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
    const index = cartItems.findIndex(cartItem => cartItem.id === productToAdd.id)

    if (index > -1) {
        let newCartitems = [...cartItems]
        newCartitems[index].quantity = newCartitems[index].quantity + 1
        return newCartitems
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cart => cart.id === cartItemToRemove.id)

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cart => cart.id !== cartItemToRemove.id)
    }

    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

const clearCartItem = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cart => cart.id !== cartItemToRemove.id)
}

export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPE.SET_CART_OPEN, bool)

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}

export const removeItemToCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove)
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart = (cartItems, productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear)
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
}