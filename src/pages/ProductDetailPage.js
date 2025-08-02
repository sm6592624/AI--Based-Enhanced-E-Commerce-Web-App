// src/pages/ProductDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { allProductsData } from '../data/products';
import { getImageFallbacks, findWorkingImage } from '../utils/imageUtils';

const ProductDetailPage = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { user, addToWishlist, isAuthenticated } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const [currentImageSrc, setCurrentImageSrc] = useState('');
    const [imageLoading, setImageLoading] = useState(true);
    const product = allProductsData.find(p => p.id === parseInt(id));

    // Load the best available image when component mounts
    useEffect(() => {
        if (product) {
            const loadBestImage = async () => {
                setImageLoading(true);
                const fallbacks = getImageFallbacks(product);
                const workingImage = await findWorkingImage(fallbacks);
                setCurrentImageSrc(workingImage);
                setImageLoading(false);
            };

            loadBestImage();
        }
    }, [product]);

    if (!product) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Product not found.</h2>
                <Link to="/shop" className="text-indigo-600 hover:underline">Go back to shop</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    const handleWishlistToggle = () => {
        if (isAuthenticated) {
            addToWishlist(product.id);
        }
    };

    const isInWishlist = user?.wishlist?.includes(product.id);

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="lg:flex">
                <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                        {imageLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                            </div>
                        )}
                        <img 
                            src={currentImageSrc} 
                            alt={product.name} 
                            className={`w-full h-auto object-cover shadow-lg transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                            onLoad={() => setImageLoading(false)}
                        />
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
                    <p className="text-3xl text-indigo-600 font-semibold mb-6">${product.price.toFixed(2)}</p>
                    <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>
                    <div className="flex items-center mb-8">
                        <label htmlFor="quantity" className="mr-4 font-semibold">Quantity:</label>
                        <div className="flex items-center border rounded-md">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2">-</button>
                            <input type="number" id="quantity" value={quantity} readOnly className="w-12 text-center border-l border-r"/>
                            <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2">+</button>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={handleAddToCart} 
                            className="flex-1 bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-indigo-700 transition duration-300 text-lg"
                        >
                            Add to Cart
                        </button>
                        {isAuthenticated && (
                            <button
                                onClick={handleWishlistToggle}
                                className={`px-6 py-4 rounded-lg border-2 transition duration-300 ${
                                    isInWishlist 
                                        ? 'border-red-500 text-red-500 bg-red-50 hover:bg-red-100' 
                                        : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                                }`}
                                title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                            >
                                <svg 
                                    className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`}
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24" 
                                    fill={isInWishlist ? "currentColor" : "none"} 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
