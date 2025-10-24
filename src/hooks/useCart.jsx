// src/hooks/useCart.jsx
import { useState, useEffect } from 'react';

const useCart = () => {
    // El carrito ahora almacena { ...item, quantity: N }
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

    // 1. Añade o incrementa la cantidad
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                // Si existe, incrementa la cantidad
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += 1;
                return newCart;
            } else {
                // Si no existe, añádelo con cantidad 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // 2. Disminuye la cantidad
    const decreaseQuantity = (id) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === id);

            if (existingItem.quantity > 1) {
                // Disminuye la cantidad
                return prevCart.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            } else {
                // Si es 1, elimina el producto del carrito
                return prevCart.filter(item => item.id !== id);
            }
        });
    };

    // 3. Elimina completamente el producto (sin verificar cantidad)
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id));
    };

    return { cart, addToCart, decreaseQuantity, removeFromCart };
};

export default useCart;