// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, UserIcon, CartIcon, MenuIcon } from '../assets/icons';
import { useAuth } from '../context/AuthContext';
import AuthModal from './auth/AuthModal';

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'AI Stylist', path: '/ai-stylist' },
        { name: 'Trends', path: '/trends' }
    ];

    const handleUserIconClick = () => {
        if (isAuthenticated) {
            setShowUserMenu(!showUserMenu);
        } else {
            setIsAuthModalOpen(true);
        }
    };

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
    };

    return (
        <>
            <header className="bg-white shadow-md sticky top-0 z-40">
                <nav className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-gray-800">
                            <Link to="/" className="focus:outline-none">
                                Aura
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-6">
                            {navLinks.map(link => (
                                <Link 
                                    key={link.name} 
                                    to={link.path} 
                                    className="text-gray-600 hover:text-indigo-600 transition duration-300 font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link 
                                to="/search"
                                className="text-gray-600 hover:text-indigo-600 transition duration-300"
                                title="Search products"
                            >
                                <SearchIcon />
                            </Link>
                            
                            {/* User Menu */}
                            <div className="relative">
                                <button 
                                    onClick={handleUserIconClick}
                                    className="text-gray-600 hover:text-indigo-600 transition duration-300 flex items-center"
                                >
                                    {isAuthenticated ? (
                                        <div className="flex items-center space-x-2">
                                            <img 
                                                src={user.avatar} 
                                                alt={user.name}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <span className="hidden md:block text-sm font-medium">{user.name}</span>
                                        </div>
                                    ) : (
                                        <UserIcon />
                                    )}
                                </button>
                                
                                {/* User Dropdown Menu */}
                                {showUserMenu && isAuthenticated && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        <Link
                                            to="/profile"
                                            onClick={() => setShowUserMenu(false)}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            to="/profile"
                                            onClick={() => setShowUserMenu(false)}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Order History
                                        </Link>
                                        <Link
                                            to="/profile"
                                            onClick={() => setShowUserMenu(false)}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Wishlist
                                        </Link>
                                        <hr className="my-1" />
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            <CartIcon />
                            <div className="md:hidden">
                                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-indigo-600 focus:outline-none">
                                    <MenuIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                    {isMobileMenuOpen && (
                        <div className="md:hidden mt-4 pb-4">
                            {navLinks.map(link => (
                                <Link 
                                    key={link.name} 
                                    to={link.path} 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="block py-3 px-4 text-base text-gray-600 hover:bg-gray-100 hover:text-indigo-600 rounded-md transition duration-300 font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {isAuthenticated && (
                                <>
                                    <hr className="my-2" />
                                    <Link 
                                        to="/profile" 
                                        onClick={() => setIsMobileMenuOpen(false)} 
                                        className="block py-3 px-4 text-base text-gray-600 hover:bg-gray-100 hover:text-indigo-600 rounded-md transition duration-300 font-medium"
                                    >
                                        My Profile
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </nav>
            </header>

            {/* Auth Modal */}
            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />

            {/* Click outside to close user menu */}
            {showUserMenu && (
                <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setShowUserMenu(false)}
                />
            )}
        </>
    );
};

export default Header;
