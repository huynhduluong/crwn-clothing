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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const count = cartItems.reduce((accumlateVal, currentItem) => (accumlateVal + currentItem.quantity), 0)
        setCartCount(count)
    }, [cartItems])


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount }
    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}