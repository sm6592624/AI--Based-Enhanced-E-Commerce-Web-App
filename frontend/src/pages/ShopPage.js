// src/pages/ShopPage.js
import React, { useState, useEffect, useMemo } from 'react';
import { allProductsData } from '../data/products';
import ProductCard from '../components/ProductCard';

const ShopPage = ({ onProductClick, initialFilters = {} }) => {
    const [filters, setFilters] = useState({
        category: 'All',
        price: 200,
        sortBy: 'newest'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    // Initialize filters only once with useMemo to prevent infinite loops
    const defaultFilters = useMemo(() => ({
        category: initialFilters.category || 'All',
        price: initialFilters.price || 200,
        sortBy: initialFilters.sortBy || 'newest'
    }), [initialFilters.category, initialFilters.price, initialFilters.sortBy]);

    // Set initial filters only once
    useEffect(() => {
        setFilters(defaultFilters);
    }, [defaultFilters]);

    // Memoize filtered and sorted products to prevent unnecessary recalculations
    const products = useMemo(() => {
        let filteredProducts = [...allProductsData];
        
        if (filters.category && filters.category !== 'All') {
            filteredProducts = filteredProducts.filter(p => p.category === filters.category);
        }
        
        if (filters.price) {
            filteredProducts = filteredProducts.filter(p => p.price <= filters.price);
        }
        
        if (filters.sortBy === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (filters.sortBy === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else {
            filteredProducts.sort((a, b) => a.id - b.id);
        }
        
        return filteredProducts;
    }, [filters.category, filters.price, filters.sortBy]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters.category, filters.price, filters.sortBy]);

    const handleFilterChange = (e) => { setFilters(prev => ({ ...prev, [e.target.name]: e.target.value })); };
    const handlePriceChange = (e) => { setFilters(prev => ({ ...prev, price: Number(e.target.value) })); };
    
    const totalPages = Math.ceil(products.length / productsPerPage);
    const currentProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);
    
    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Shop Our Collection</h1>
            <div className="lg:flex">
                <aside className="lg:w-1/4 lg:pr-8 mb-8 lg:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                        <h3 className="text-xl font-semibold mb-4">Filters</h3>
                        <div className="mb-6">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select name="category" id="category" value={filters.category} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-md">
                                <option value="All">All</option>
                                <option value="Tops">Tops</option>
                                <option value="Bottoms">Bottoms</option>
                                <option value="Dresses">Dresses</option>
                                <option value="Jackets">Jackets</option>
                                <option value="Shoes">Shoes</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Max Price: ${filters.price}</label>
                            <input type="range" name="price" id="price" min="10" max="200" step="5" value={filters.price} onChange={handlePriceChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                        </div>
                        <div>
                            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                            <select name="sortBy" id="sortBy" value={filters.sortBy} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-md">
                                <option value="newest">Newest</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </aside>
                <main className="lg:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {currentProducts.length > 0 ? (
                            currentProducts.map(product => <ProductCard key={product.id} product={product} onProductClick={onProductClick} />)
                        ) : (
                            <p className="sm:col-span-2 xl:col-span-3 text-center text-gray-500">No products match your filters.</p>
                        )}
                    </div>
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                                <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)} className={`mx-1 px-4 py-2 rounded-md ${currentPage === pageNumber ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}>{pageNumber}</button>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ShopPage;
