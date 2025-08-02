// src/pages/OrderConfirmationPage.js
import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const OrderConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;

    useEffect(() => {
        // Redirect to home if no order data
        if (!order) {
            navigate('/');
        }
    }, [order, navigate]);

    if (!order) {
        return null; // Component will redirect
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="max-w-2xl mx-auto text-center">
                {/* Success Icon */}
                <div className="mb-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
                    <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
                </div>

                {/* Order Details */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-left">
                    <div className="border-b pb-4 mb-6">
                        <h2 className="text-xl font-semibold mb-2">Order Details</h2>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-600">Order Number:</span>
                                <span className="font-medium ml-2">#{order.id}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">Order Date:</span>
                                <span className="font-medium ml-2">
                                    {new Date(order.date).toLocaleDateString()}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-600">Status:</span>
                                <span className="font-medium ml-2 text-green-600">{order.status}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">Total:</span>
                                <span className="font-bold ml-2 text-lg">${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-4">Items Ordered</h3>
                        <div className="space-y-4">
                            {order.items.map(item => (
                                <div key={item.id} className="flex items-center space-x-4 pb-4 border-b last:border-b-0">
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.name}
                                        className="w-16 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-medium">{item.name}</h4>
                                        <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                                        <p className="text-gray-600 text-sm">Price: ${item.price.toFixed(2)} each</p>
                                    </div>
                                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="border-t pt-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping:</span>
                                <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax:</span>
                                <span>${order.tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>Total:</span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    {order.shippingAddress && (
                        <div className="mt-6 pt-6 border-t">
                            <h3 className="font-semibold mb-2">Shipping Address</h3>
                            <div className="text-gray-600">
                                <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                                <p>{order.shippingAddress.address}</p>
                                <p>
                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                                </p>
                                <p>{order.shippingAddress.country}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* What's Next */}
                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                    <h3 className="font-semibold text-blue-800 mb-3">What happens next?</h3>
                    <div className="text-left text-blue-700 space-y-2">
                        <p>• You'll receive an email confirmation shortly</p>
                        <p>• We'll send you tracking information once your order ships</p>
                        <p>• Expected delivery: 3-5 business days</p>
                        <p>• You can track your order in your profile</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/profile"
                        className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 font-medium"
                    >
                        View Orders
                    </Link>
                    <Link
                        to="/shop"
                        className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition duration-300 font-medium"
                    >
                        Continue Shopping
                    </Link>
                </div>

                {/* Customer Support */}
                <div className="mt-8 text-center text-gray-600">
                    <p className="text-sm">
                        Questions about your order? Contact us at 
                        <a href="mailto:support@aura.com" className="text-indigo-600 hover:underline ml-1">
                            support@aura.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
