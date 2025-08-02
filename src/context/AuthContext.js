// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Load user from localStorage on app start
    useEffect(() => {
        const savedUser = localStorage.getItem('aura_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (err) {
                console.error('Failed to parse saved user:', err);
                localStorage.removeItem('aura_user');
            }
        }
        setLoading(false);
    }, []);

    // Save user to localStorage whenever user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('aura_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('aura_user');
        }
    }, [user]);

    const register = async (userData) => {
        setLoading(true);
        setError('');

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check if user already exists (mock validation)
            const existingUsers = JSON.parse(localStorage.getItem('aura_users') || '[]');
            const userExists = existingUsers.find(u => u.email === userData.email);

            if (userExists) {
                throw new Error('User with this email already exists');
            }

            // Create new user
            const newUser = {
                id: Date.now().toString(),
                name: userData.name,
                email: userData.email,
                avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${userData.name}`,
                createdAt: new Date().toISOString(),
                preferences: {
                    style: '',
                    occasion: '',
                    budget: '',
                    bodyType: ''
                },
                orders: [],
                wishlist: []
            };

            // Save to mock database
            existingUsers.push({ ...newUser, password: userData.password });
            localStorage.setItem('aura_users', JSON.stringify(existingUsers));

            // Set current user (without password)
            const { password, ...userWithoutPassword } = newUser;
            setUser(userWithoutPassword);

            return { success: true, user: userWithoutPassword };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        setError('');

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check credentials (mock validation)
            const existingUsers = JSON.parse(localStorage.getItem('aura_users') || '[]');
            const user = existingUsers.find(u => u.email === email && u.password === password);

            if (!user) {
                throw new Error('Invalid email or password');
            }

            // Set current user (without password)
            const { password: _, ...userWithoutPassword } = user;
            setUser(userWithoutPassword);

            return { success: true, user: userWithoutPassword };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setError('');
    };

    const updateProfile = async (userData) => {
        setLoading(true);
        setError('');

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Update user data
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);

            // Update in mock database
            const existingUsers = JSON.parse(localStorage.getItem('aura_users') || '[]');
            const userIndex = existingUsers.findIndex(u => u.id === user.id);
            if (userIndex !== -1) {
                existingUsers[userIndex] = { ...existingUsers[userIndex], ...userData };
                localStorage.setItem('aura_users', JSON.stringify(existingUsers));
            }

            return { success: true, user: updatedUser };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const addToWishlist = (productId) => {
        if (!user) return;
        
        const updatedWishlist = user.wishlist?.includes(productId)
            ? user.wishlist.filter(id => id !== productId)
            : [...(user.wishlist || []), productId];

        updateProfile({ wishlist: updatedWishlist });
    };

    const value = {
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        addToWishlist,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
