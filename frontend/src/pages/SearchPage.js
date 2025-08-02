// src/pages/SearchPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { allProductsData } from '../data/products';
import ProductCard from '../components/ProductCard';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [results, setResults] = useState([]);
    const [filters, setFilters] = useState({
        category: 'All',
        priceRange: 'All',
        sortBy: 'relevance'
    });
    const [loading, setLoading] = useState(false);

    const performSearch = useCallback(async (query, currentFilters = filters) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        
        // Simulate search delay
        await new Promise(resolve => setTimeout(resolve, 300));

        const searchTerms = query.toLowerCase().split(' ');
        
        const searchResults = allProductsData.filter(product => {
            const searchableText = `${product.name} ${product.description} ${product.category}`.toLowerCase();
            return searchTerms.some(term => searchableText.includes(term));
        });

        // Apply filters
        let filteredResults = searchResults;

        if (currentFilters.category !== 'All') {
            filteredResults = filteredResults.filter(product => product.category === currentFilters.category);
        }

        if (currentFilters.priceRange !== 'All') {
            const [min, max] = currentFilters.priceRange.split('-').map(Number);
            filteredResults = filteredResults.filter(product => {
                return product.price >= min && (max ? product.price <= max : true);
            });
        }

        // Apply sorting
        switch (currentFilters.sortBy) {
            case 'price-low':
                filteredResults.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredResults.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filteredResults.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default: // relevance
                // Results are already ordered by relevance from the search
                break;
        }

        setResults(filteredResults);
        setLoading(false);
    }, [filters]);

    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            setSearchQuery(query);
            performSearch(query);
        }
    }, [searchParams, performSearch]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
        // Re-run search with new filters
        if (searchQuery) {
            performSearch(searchQuery);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setResults([]);
        navigate('/search');
    };

    const categories = ['All', ...new Set(allProductsData.map(product => product.category))];
    const priceRanges = [
        { label: 'All Prices', value: 'All' },
        { label: 'Under $50', value: '0-50' },
        { label: '$50 - $100', value: '50-100' },
        { label: '$100 - $150', value: '100-150' },
        { label: 'Over $150', value: '150' }
    ];

    return (
        <div className="container mx-auto px-6 py-12">
            {/* Search Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Search Products</h1>
                <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                    <div className="flex">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for products..."
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Search
                        </button>
                    </div>
                </form>
                {searchQuery && (
                    <div className="mt-4 flex items-center justify-center space-x-4">
                        <p className="text-gray-600">
                            {loading ? 'Searching...' : `${results.length} results for "${searchQuery}"`}
                        </p>
                        <button
                            onClick={clearSearch}
                            className="text-indigo-600 hover:text-indigo-800 underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>

            {/* Filters and Results */}
            {searchQuery && (
                <div className="lg:flex lg:gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-1/4 mb-8 lg:mb-0">
                        <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                            <h3 className="text-xl font-semibold mb-4">Filters</h3>
                            
                            {/* Category Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price Range
                                </label>
                                <select
                                    value={filters.priceRange}
                                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                >
                                    {priceRanges.map(range => (
                                        <option key={range.value} value={range.value}>
                                            {range.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sort By
                                </label>
                                <select
                                    value={filters.sortBy}
                                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="relevance">Relevance</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name">Name A-Z</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:w-3/4">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                                <p className="mt-4 text-gray-600">Searching...</p>
                            </div>
                        ) : results.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {results.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : searchQuery ? (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
                                <p className="text-gray-600 mb-4">
                                    We couldn't find any products matching "{searchQuery}"
                                </p>
                                <div className="space-y-2 text-sm text-gray-500">
                                    <p>Try:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Checking your spelling</li>
                                        <li>Using more general terms</li>
                                        <li>Trying different keywords</li>
                                        <li>Clearing filters</li>
                                    </ul>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}

            {/* Popular Searches */}
            {!searchQuery && (
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Popular Searches</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {['Dresses', 'Jeans', 'Shoes', 'Jackets', 'Tops', 'Accessories', 'Sale', 'New Arrivals'].map(term => (
                            <button
                                key={term}
                                onClick={() => {
                                    setSearchQuery(term);
                                    navigate(`/search?q=${encodeURIComponent(term)}`);
                                }}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg transition duration-300 text-left"
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
