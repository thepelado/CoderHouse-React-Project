import React, { useState, useEffect, useContext } from 'react';

export const CartContext = React.createContext([]);
export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ defaultValue = [], children }) => {

    const cartLocalStorage = JSON.parse(localStorage.getItem('cart'));
    const [cart, setCart] = useState(cartLocalStorage && cartLocalStorage.length > 0 ? cartLocalStorage : defaultValue);
    cart.totalPrice = cart.length > 0 ? cart.reduce((total, cartItem) => total + (cartItem.qty * cartItem.item.price), 0) : '0,00';
    cart.count = cart.length > 0 ? cart.reduce((total, cartItem) => total + cartItem.qty, 0) : '0';

    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    const [loggedUser, setLoggedUser] = useState(userLocalStorage? userLocalStorage : defaultValue);

    const addItem = async(item, qty) => {
        if (!isInCart(item.id)) {
            const newCart = [...cart, { item:item, qty: qty }];
            setCart(newCart);
        } else {
            setCart(cart.map(cartItem => {
                if (cartItem.item.id === item.id) {
                    return { ...cartItem, qty: cartItem.qty + qty }

                } else {
                    return cartItem
                }
            }))
        }
        
    }

    const removeItem = (itemId) => {
        setCart(cart.filter(cartItem => cartItem.item.id !== itemId))
    }

    const clearCart = () => setCart([]);

    const isInCart = (id) => {
        return cart.some(cartItem => cartItem.item.id == id);
    }

    const setUser = (user) => {
        setLoggedUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart, loggedUser]);

    return (
        <CartContext.Provider value={{cart, loggedUser, addItem, removeItem, clearCart, setUser}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;