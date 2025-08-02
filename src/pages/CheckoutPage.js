// src/pages/CheckoutPage.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const { cartItems, cartSubtotal, clearCart, setIsCartOpen } = useCart();
    const { user, isAuthenticated, updateProfile } = useAuth();
    const navigate = useNavigate();
    
    // Debug logging with more details
    console.log('🛒 CheckoutPage rendered');
    console.log('📦 cartItems:', cartItems);
    console.log('📊 cartItems.length:', cartItems?.length || 0);
    console.log('💰 cartSubtotal:', cartSubtotal);
    console.log('👤 isAuthenticated:', isAuthenticated);
    console.log('🔍 clearCart function:', typeof clearCart);
    
    // Check localStorage for debugging
    const savedCart = localStorage.getItem('aura_cart');
    console.log('💾 localStorage cart:', savedCart);
    
    const [formData, setFormData] = useState({
        email: user?.email || '',
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        paymentMethod: 'card',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
    const tax = cartSubtotal * 0.08; // 8% tax
    const shipping = cartSubtotal > 50 ? 0 : 10; // Free shipping over $50
    const total = cartSubtotal + tax + shipping;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
        
        if (formData.paymentMethod === 'card') {
            if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
            if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
            if (!formData.cvv) newErrors.cvv = 'CVV is required';
            if (!formData.nameOnCard) newErrors.nameOnCard = 'Name on card is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isAuthenticated) {
            alert('Please log in to complete your order');
            return;
        }
        
        if (!validateForm()) return;
        
        setLoading(true);
        
        try {
            // Simulate order processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Create order object
            const order = {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                items: cartItems,
                subtotal: cartSubtotal,
                tax: tax,
                shipping: shipping,
                total: total,
                status: 'Processing',
                shippingAddress: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country
                }
            };
            
            // Add order to user's order history
            const currentOrders = user?.orders || [];
            await updateProfile({ orders: [...currentOrders, order] });
            
            // Clear cart
            clearCart();
            setIsCartOpen(false);
            
            // Navigate to order confirmation
            navigate('/order-confirmation', { state: { order } });
            
        } catch (error) {
            console.error('Order processing failed:', error);
            alert('There was an error processing your order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        console.log('CheckoutPage: Cart is empty, showing empty cart message');
        return (
            <div className="container mx-auto px-6 py-12 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
                <p className="text-gray-600 mb-8">Add some items to your cart to continue</p>
                <button 
                    onClick={() => navigate('/shop')}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                    Continue Shopping
                </button>
                <div className="mt-4 space-y-2">
                    <div className="text-xs text-gray-400">
                        Debug: Cart items length = {cartItems.length}
                    </div>
                    <button 
                        onClick={() => {
                            // Try to reload cart from localStorage
                            const savedCart = localStorage.getItem('aura_cart');
                            console.log('LocalStorage cart:', savedCart);
                            if (savedCart) {
                                const items = JSON.parse(savedCart);
                                console.log('Trying to restore cart items:', items);
                                if (items.length > 0) {
                                    alert(`Found ${items.length} items in localStorage. Refreshing...`);
                                    window.location.reload();
                                } else {
                                    alert('No items found in localStorage');
                                }
                            } else {
                                alert('No cart data in localStorage');
                            }
                        }}
                        className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition duration-300"
                    >
                        Debug: Check LocalStorage
                    </button>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto px-6 py-12 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Please log in</h1>
                <p className="text-gray-600 mb-8">You need to be logged in to checkout</p>
                <button 
                    onClick={() => navigate('/')}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
            
            <div className="lg:flex lg:gap-12">
                {/* Order Summary */}
                <div className="lg:w-2/5 mb-8 lg:mb-0">
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        
                        {/* Cart Items */}
                        <div className="space-y-4 mb-6">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center space-x-4">
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.name}
                                        className="w-16 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-sm">{item.name}</h3>
                                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                                    </div>
                                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        
                        {/* Price Breakdown */}
                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${cartSubtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Checkout Form */}
                <div className="lg:w-3/5">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Contact Information */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                </div>
                            </div>
                        </div>
                        
                        {/* Shipping Address */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            State *
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            ZIP Code *
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Payment Information */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Payment Method
                                    </label>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="card"
                                                checked={formData.paymentMethod === 'card'}
                                                onChange={handleInputChange}
                                                className="mr-2"
                                            />
                                            Credit/Debit Card
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="paypal"
                                                checked={formData.paymentMethod === 'paypal'}
                                                onChange={handleInputChange}
                                                className="mr-2"
                                            />
                                            PayPal
                                        </label>
                                    </div>
                                </div>
                                
                                {formData.paymentMethod === 'card' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Card Number *
                                            </label>
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                placeholder="1234 5678 9012 3456"
                                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Expiry Date *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="expiryDate"
                                                    value={formData.expiryDate}
                                                    onChange={handleInputChange}
                                                    placeholder="MM/YY"
                                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                                {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    CVV *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    value={formData.cvv}
                                                    onChange={handleInputChange}
                                                    placeholder="123"
                                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Name on Card *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="nameOnCard"
                                                    value={formData.nameOnCard}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.nameOnCard ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                                {errors.nameOnCard && <p className="text-red-500 text-sm mt-1">{errors.nameOnCard}</p>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {formData.paymentMethod === 'paypal' && (
                                    <div className="bg-blue-50 p-4 rounded-md">
                                        <p className="text-blue-800">
                                            You will be redirected to PayPal to complete your payment securely.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 text-lg"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Processing Order...
                                </div>
                            ) : (
                                `Place Order - $${total.toFixed(2)}`
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
