
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartDropDownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems)
    const navigate = useNavigate()

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <CartDropDownContainer>
            <CartItems>
                {cartItems.length > 0 ? (cartItems || []).map(item => <CartItem cartItem={item} key={item.id} />) :
                    <EmptyMessage>Your cart is empty</EmptyMessage>}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropDownContainer>
    )
};

export default CartDropdown;