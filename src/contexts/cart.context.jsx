import { createContext, useState, useEffect } from 'react'

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemToCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0,
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        const count = cartItems.reduce((accumlateVal, currentItem) => (accumlateVal + currentItem.quantity), 0)
        const newCartTotal = cartItems.reduce((accumlateVal, currentItem) => (accumlateVal + currentItem.quantity * currentItem.price), 0)
        setCartCount(count)
        setCartTotal(newCartTotal)
    }, [cartItems])


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemToCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const clearItemFromCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems, productToClear))
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartTotal, cartCount, removeItemToCart, clearItemFromCart }
    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}