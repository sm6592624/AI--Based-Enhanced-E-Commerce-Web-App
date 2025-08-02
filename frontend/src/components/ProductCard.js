// src/components/ProductCard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getImageFallbacks, findWorkingImage } from '../utils/imageUtils';
import Toast from './Toast';

const ProductCard = ({ product, onProductClick }) => {
    const { user, addToWishlist, isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const [currentImageSrc, setCurrentImageSrc] = useState('');
    const [imageLoading, setImageLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);

    // Load the best available image when component mounts
    useEffect(() => {
        const loadBestImage = async () => {
            setImageLoading(true);
            const fallbacks = getImageFallbacks(product);
            const workingImage = await findWorkingImage(fallbacks);
            setCurrentImageSrc(workingImage);
            setImageLoading(false);
        };

        loadBestImage();
    }, [product]);

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const handleWishlistClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isAuthenticated) {
            addToWishlist(product.id);
        }
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🛒 ProductCard: Adding to cart:', product);
        
        // Validate product has required fields
        if (!product.id || !product.name || !product.price) {
            console.error('❌ Product missing required fields:', product);
            return;
        }
        
        const success = addToCart(product, 1);
        
        if (success !== false) {
            console.log('✅ ProductCard: Product added successfully');
            setShowToast(true);
        } else {
            console.error('❌ ProductCard: Failed to add product');
        }
    };

    const isInWishlist = user?.wishlist?.includes(product.id);

    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="relative h-64 bg-gray-100">
                    {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
                        </div>
                    )}
                    {/* Wishlist Button */}
                    {isAuthenticated && (
                        <button
                            onClick={handleWishlistClick}
                            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 z-10"
                        >
                            <svg 
                                className={`w-5 h-5 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill={isInWishlist ? "currentColor" : "none"} 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    )}
                    <Link to={`/product/${product.id}`}>
                        <img 
                            src={currentImageSrc}
                            alt={product.name}
                            className={`w-full h-full object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 cursor-pointer`}
                            onLoad={handleImageLoad}
                        />
                    </Link>
                </div>
                <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-indigo-600 transition duration-300">{product.name}</h3>
                    </Link>
                    <p className="text-xl font-bold text-gray-900 mb-3">${product.price}</p>
                    
                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 font-medium"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
            
            {/* Toast Notification */}
            {showToast && (
                <Toast 
                    message={`${product.name} added to cart!`}
                    type="success"
                    isVisible={showToast}
                    onClose={() => setShowToast(false)}
                    duration={2000}
                />
            )}
        </>
    );
};

export default ProductCard;
