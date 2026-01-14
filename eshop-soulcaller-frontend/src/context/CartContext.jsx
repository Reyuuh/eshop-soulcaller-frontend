/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Create the context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to load cart from localStorage:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add product to cart
    const addToCart = useCallback((product) => {
        setCartItems((prevItems) => {
            const normalizedProduct = {
                ...product,
                price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
                quantity: product.quantity || 1
            };
            
            const existingItem = prevItems.find((item) => item.id === normalizedProduct.id);

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === normalizedProduct.id
                        ? { ...item, quantity: item.quantity + normalizedProduct.quantity }
                        : item
                );
            } else {
                return [...prevItems, normalizedProduct];
            }
        });
    }, []);

    // Remove product from cart
    const removeFromCart = useCallback((productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    }, []);

    // Update product quantity in cart
    const updateQuantity = useCallback((productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    }, [removeFromCart]);

    // Clear entire cart
    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    // Calculate total price
    const getTotalPrice = useCallback(() => {
        return cartItems.reduce((total, item) => {
            const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
            return total + (price * item.quantity);
        }, 0);
    }, [cartItems]);

    // Get cart item count
    const getCartItemCount = useCallback(() => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    }, [cartItems]);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getCartItemCount,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};