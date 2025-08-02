// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Import pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import TrendsPage from './pages/TrendsPage';
import AiStylistPage from './pages/AiStylistPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import SearchPage from './pages/SearchPage';

export default function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="bg-gray-100 font-sans min-h-screen">
                        <Header />
                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/shop" element={<ShopPage />} />
                                <Route path="/product/:id" element={<ProductDetailPage />} />
                                <Route path="/trends" element={<TrendsPage />} />
                                <Route path="/ai-stylist" element={<AiStylistPage />} />
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/checkout" element={<CheckoutPage />} />
                                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                                <Route path="/search" element={<SearchPage />} />
                            </Routes>
                        </main>
                        <Footer />
                        <CartSidebar />
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}
