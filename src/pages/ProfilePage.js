// src/pages/ProfilePage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { allProductsData } from '../data/products';

const ProfilePage = () => {
    const { user, updateProfile, logout, loading } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        preferences: {
            style: user?.preferences?.style || '',
            occasion: user?.preferences?.occasion || '',
            budget: user?.preferences?.budget || '',
            bodyType: user?.preferences?.bodyType || ''
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('preferences.')) {
            const prefKey = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                preferences: { ...prev.preferences, [prefKey]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSaveProfile = async () => {
        const result = await updateProfile(formData);
        if (result.success) {
            setEditMode(false);
        }
    };

    const handleCancelEdit = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            preferences: {
                style: user?.preferences?.style || '',
                occasion: user?.preferences?.occasion || '',
                budget: user?.preferences?.budget || '',
                bodyType: user?.preferences?.bodyType || ''
            }
        });
        setEditMode(false);
    };

    const getWishlistProducts = () => {
        if (!user?.wishlist) return [];
        return allProductsData.filter(product => user.wishlist.includes(product.id));
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: '👤' },
        { id: 'orders', label: 'Orders', icon: '📦' },
        { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
        { id: 'preferences', label: 'Style Preferences', icon: '🎨' }
    ];

    const styleOptions = ['Casual', 'Business', 'Formal', 'Bohemian', 'Minimalist', 'Trendy'];
    const occasionOptions = ['Work', 'Date Night', 'Party', 'Vacation', 'Wedding', 'Everyday'];
    const budgetOptions = ['Under $100', '$100-$300', '$300-$500', '$500+'];
    const bodyTypeOptions = ['Pear', 'Apple', 'Hourglass', 'Rectangle', 'Inverted Triangle'];

    if (!user) {
        return (
            <div className="container mx-auto px-6 py-12 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view your profile</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img 
                                src={user.avatar} 
                                alt={user.name}
                                className="w-16 h-16 rounded-full bg-gray-200"
                            />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                                <p className="text-gray-600">{user.email}</p>
                                <p className="text-sm text-gray-500">
                                    Member since {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-lg">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === tab.id
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold">Profile Information</h2>
                                    {!editMode ? (
                                        <button
                                            onClick={() => setEditMode(true)}
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                                        >
                                            Edit Profile
                                        </button>
                                    ) : (
                                        <div className="space-x-2">
                                            <button
                                                onClick={handleSaveProfile}
                                                disabled={loading}
                                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition duration-300"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            disabled={!editMode}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            disabled={!editMode}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-6">Order History</h2>
                                {user.orders?.length > 0 ? (
                                    <div className="space-y-4">
                                        {user.orders.map(order => (
                                            <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h3 className="font-semibold">Order #{order.id}</h3>
                                                    <span className="text-green-600 font-medium">${order.total}</span>
                                                </div>
                                                <p className="text-gray-600 text-sm">
                                                    {new Date(order.date).toLocaleDateString()} • {order.status}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 mb-4">No orders yet</p>
                                        <p className="text-sm text-gray-400">
                                            Start shopping to see your orders here
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Wishlist Tab */}
                        {activeTab === 'wishlist' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-6">Your Wishlist</h2>
                                {getWishlistProducts().length > 0 ? (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {getWishlistProducts().map(product => (
                                            <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                                                <img 
                                                    src={product.imageUrl} 
                                                    alt={product.name}
                                                    className="w-full h-48 object-cover rounded-md mb-3"
                                                />
                                                <h3 className="font-semibold mb-1">{product.name}</h3>
                                                <p className="text-indigo-600 font-bold">${product.price}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 mb-4">Your wishlist is empty</p>
                                        <p className="text-sm text-gray-400">
                                            Add items you love to see them here
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Style Preferences Tab */}
                        {activeTab === 'preferences' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-6">Style Preferences</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Style Preference
                                        </label>
                                        <select
                                            name="preferences.style"
                                            value={formData.preferences.style}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="">Select style</option>
                                            {styleOptions.map(style => (
                                                <option key={style} value={style}>{style}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Occasion
                                        </label>
                                        <select
                                            name="preferences.occasion"
                                            value={formData.preferences.occasion}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="">Select occasion</option>
                                            {occasionOptions.map(occasion => (
                                                <option key={occasion} value={occasion}>{occasion}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Budget Range
                                        </label>
                                        <select
                                            name="preferences.budget"
                                            value={formData.preferences.budget}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="">Select budget</option>
                                            {budgetOptions.map(budget => (
                                                <option key={budget} value={budget}>{budget}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Body Type
                                        </label>
                                        <select
                                            name="preferences.bodyType"
                                            value={formData.preferences.bodyType}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="">Select body type</option>
                                            {bodyTypeOptions.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button
                                        onClick={handleSaveProfile}
                                        disabled={loading}
                                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition duration-300"
                                    >
                                        Save Preferences
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
