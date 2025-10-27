import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += 1;
                return newCart;
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const increaseQuantity = (id) => {
        setCart((prevCart) => {
            return prevCart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
        });
    };

    const decreaseQuantity = (id) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === id);

            if (existingItem.quantity > 1) {
                return prevCart.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            } else {
                return prevCart.filter(item => item.id !== id);
            }
        });
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart, increaseQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

export { CartContext, CartProvider, useCart };