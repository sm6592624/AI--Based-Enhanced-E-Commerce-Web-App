// src/context/CartContext.js
import React, { useState, createContext, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Initialize cart from localStorage
        try {
            const savedCart = localStorage.getItem('aura_cart');
            const items = savedCart ? JSON.parse(savedCart) : [];
            console.log('CartProvider: Loading cart from localStorage:', items);
            return Array.isArray(items) ? items : [];
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            return [];
        }
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Save cart to localStorage whenever cartItems changes
    useEffect(() => {
        try {
            console.log('CartProvider: Saving cart to localStorage:', cartItems);
            localStorage.setItem('aura_cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        console.log('🛒 addToCart called with:', { product, quantity });
        
        // Validate product
        if (!product || typeof product !== 'object') {
            console.error('❌ Invalid product passed to addToCart:', product);
            return false;
        }

        if (!product.id || !product.name || !product.price) {
            console.error('❌ Product missing required fields:', product);
            return false;
        }

        try {
            setCartItems(prevItems => {
                console.log('🔄 Previous cart items:', prevItems);
                
                // Ensure prevItems is always an array
                const currentItems = Array.isArray(prevItems) ? prevItems : [];
                
                const existingItem = currentItems.find(item => item.id === product.id);
                let newItems;
                
                if (existingItem) {
                    console.log('✅ Item exists, updating quantity');
                    newItems = currentItems.map(item =>
                        item.id === product.id 
                            ? { ...item, quantity: item.quantity + quantity } 
                            : item
                    );
                } else {
                    console.log('➕ New item, adding to cart');
                    // Create a clean cart item object
                    const cartItem = {
                        id: product.id,
                        name: product.name,
                        price: Number(product.price),
                        imageUrl: product.imageUrl || '',
                        category: product.category || '',
                        description: product.description || '',
                        quantity: Number(quantity)
                    };
                    newItems = [...currentItems, cartItem];
                }
                
                console.log('✅ New cart items:', newItems);
                return newItems;
            });
            
            // Show cart sidebar after a brief delay
            setTimeout(() => {
                console.log('📱 Opening cart sidebar');
                setIsCartOpen(true);
            }, 200);
            
            return true;
        } catch (error) {
            console.error('❌ Error in addToCart:', error);
            return false;
        }
    };

    const removeFromCart = (productId) => {
        console.log('🗑️ Removing item from cart:', productId);
        setCartItems(prevItems => {
            const currentItems = Array.isArray(prevItems) ? prevItems : [];
            const newItems = currentItems.filter(item => item.id !== productId);
            console.log('🗑️ Cart after removal:', newItems);
            return newItems;
        });
    };

    const updateQuantity = (productId, quantity) => {
        console.log('🔢 Updating quantity:', { productId, quantity });
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCartItems(prevItems => {
                const currentItems = Array.isArray(prevItems) ? prevItems : [];
                const newItems = currentItems.map(item =>
                    item.id === productId ? { ...item, quantity: Number(quantity) } : item
                );
                console.log('🔢 Cart after quantity update:', newItems);
                return newItems;
            });
        }
    };

    const clearCart = () => {
        console.log('🧹 Clearing cart');
        setCartItems([]);
        localStorage.removeItem('aura_cart');
    };
    
    // Ensure cartItems is always an array before calculations
    const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
    const cartCount = safeCartItems.reduce((count, item) => count + (Number(item.quantity) || 0), 0);
    const cartSubtotal = safeCartItems.reduce((total, item) => total + ((Number(item.price) || 0) * (Number(item.quantity) || 0)), 0);

    console.log('📊 CartProvider render - cartItems count:', safeCartItems.length, 'cartCount:', cartCount, 'subtotal:', cartSubtotal);

    const value = { 
        cartItems: safeCartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        isCartOpen, 
        setIsCartOpen, 
        cartCount, 
        cartSubtotal, 
        setCartItems 
    };
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};