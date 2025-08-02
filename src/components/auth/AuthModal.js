// src/components/auth/AuthModal.js
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
    const [mode, setMode] = useState(initialMode);

    if (!isOpen) return null;

    const handleSwitchMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                        >
                            ×
                        </button>
                    </div>

                    {mode === 'login' ? (
                        <LoginForm 
                            onSwitchToRegister={handleSwitchMode} 
                            onClose={onClose}
                        />
                    ) : (
                        <RegisterForm 
                            onSwitchToLogin={handleSwitchMode} 
                            onClose={onClose}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
