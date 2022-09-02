import { createContext, useReducer } from 'react'
import { createAction } from '../utils/reducer/reducer.utils'

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

const CART_ACTION_TYPE = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_OPEN: 'SET_CART_OPEN'
}

export const CartContext = createContext({
    setIsCartOpen: () => { },
    addItemToCart: () => { },
    removeItemToCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartItems: [],
    cartTotal: 0,
    isCartOpen: false,
})

const INITIAL_STATE = {
    cartCount: 0,
    cartItems: [],
    cartTotal: 0,
    isCartOpen: false,
}

const cartReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };
        case CART_ACTION_TYPE.SET_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            };
        default:
            throw new Error(`unhandle type of ${type} in cartReducer`)
    }
}



export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const { cartItems } = state

    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((accumlateVal, currentItem) => (accumlateVal + currentItem.quantity), 0)
        const newCartTotal = newCartItems.reduce((accumlateVal, currentItem) => (accumlateVal + currentItem.quantity * currentItem.price), 0)
        dispatch(createAction(CART_ACTION_TYPE.SET_CART_ITEMS, {
            cartCount: newCartCount,
            cartItems: newCartItems,
            cartTotal: newCartTotal,
        }))
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemReducer(newCartItems)
    }

    const removeItemToCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove)
        updateCartItemReducer(newCartItems)
    }

    const clearItemFromCart = (productToClear) => {
        const newCartItems = clearCartItem(cartItems, productToClear)
        updateCartItemReducer(newCartItems)
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPE.SET_CART_OPEN, bool))
    }

    const value = { ...state, setIsCartOpen, addItemToCart, removeItemToCart, clearItemFromCart }
    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}