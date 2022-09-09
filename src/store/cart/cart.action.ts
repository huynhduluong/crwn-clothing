import { ActionWithPayload, withMatcher } from './../../utils/reducer/reducer.utils';
import { createAction } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";
import { CartItem, CART_ACTION_TYPE } from "./cart.types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
    const index = cartItems.findIndex(cartItem => cartItem.id === productToAdd.id)

    if (index > -1) {
        let newCartitems = [...cartItems]
        newCartitems[index].quantity = newCartitems[index].quantity + 1
        return newCartitems
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
    const existingCartItem = cartItems.find(cart => cart.id === cartItemToRemove.id)

    if (existingCartItem?.quantity === 1) {
        return cartItems.filter(cart => cart.id !== cartItemToRemove.id)
    }

    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

const clearCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
    return cartItems.filter(cart => cart.id !== cartItemToRemove.id)
}

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPE.SET_CART_OPEN, boolean>

export type SetCartItem = ActionWithPayload<CART_ACTION_TYPE.SET_CART_ITEMS, CartItem[]>

export const setCartItem = withMatcher((cartItems: CartItem[]): SetCartItem => createAction(CART_ACTION_TYPE.SET_CART_ITEMS, cartItems))

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPE.SET_CART_OPEN, bool))

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return setCartItem(newCartItems)
}

export const removeItemToCart = (cartItems: CartItem[], productToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, productToRemove)
    return setCartItem(newCartItems)
}

export const clearItemFromCart = (cartItems: CartItem[], productToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, productToClear)
    return setCartItem(newCartItems)
}