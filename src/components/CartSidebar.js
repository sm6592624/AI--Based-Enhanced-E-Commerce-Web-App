// src/components/CartSidebar.js
import React from 'react';
import { useCart } from '../context/CartContext';
import { CloseIcon } from '../assets/icons';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
    const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartSubtotal } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsCartOpen(false)}>
            <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold">Your Cart</h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-800"><CloseIcon /></button>
                </div>
                <div className="flex-grow overflow-y-auto p-6">
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="flex items-center mb-6">
                                <img src={item.imageUrl} alt={item.name} className="w-20 h-24 object-cover rounded-md mr-4" />
                                <div className="flex-grow">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                    <div className="flex items-center mt-2">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border rounded-md">-</button>
                                        <span className="px-4">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded-md">+</button>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 ml-4"><CloseIcon/></button>
                            </div>
                        ))
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="p-6 border-t">
                        <div className="flex justify-between font-bold text-xl mb-4">
                            <span>Subtotal</span>
                            <span>${cartSubtotal.toFixed(2)}</span>
                        </div>
                        <Link 
                            to="/checkout" 
                            onClick={() => setIsCartOpen(false)}
                            className="block w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-all text-center"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
