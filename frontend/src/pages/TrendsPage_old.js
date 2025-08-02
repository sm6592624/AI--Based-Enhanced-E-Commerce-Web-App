// src/pages/TrendsPage.js
import React, { useState, useEffect } from 'react';
import config, { validateConfig } from '../config/env';
import { debugConfig } from '../utils/debug';
import { mockTrendsData } from '../data/mockData';

const TrendsPage = () => {
    const [trends, setTrends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [usingMockData, setUsingMockData] = useState(false);

    useEffect(() => {
        // Debug environment variables
        debugConfig();
        
        // Check if we should use mock data
        if (config.useMockData || !config.unsplashApiKey) {
            console.log('Using mock data for trends');
            setTrends(mockTrendsData);
            setUsingMockData(true);
            setLoading(false);
            return;
        }
        
        try {
            validateConfig();
            fetchTrends();
        } catch (err) {
            console.error('Config validation error:', err);
            console.log('Falling back to mock data');
            setTrends(mockTrendsData);
            setUsingMockData(true);
            setLoading(false);
        }
    }, []);

    const fetchTrends = async () => {
        console.log('Starting fetchTrends...');
        console.log('Config unsplashApiKey:', config.unsplashApiKey ? 'SET' : 'MISSING');
        
        if (!config.unsplashApiKey) {
            const errorMsg = 'Unsplash API key is not configured. Please add REACT_APP_UNSPLASH_API_KEY to your .env file.';
            console.error(errorMsg);
            setError(errorMsg);
            setTrends(mockTrendsData);
            setUsingMockData(true);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError('');

            console.log('Making API request to Unsplash...');
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=fashion+trends+2024&per_page=12&orientation=portrait`,
                {
                    headers: {
                        'Authorization': `Client-ID ${config.unsplashApiKey}`
                    }
                }
            );

            console.log('Unsplash API response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Unsplash API error:', response.status, errorText);
                throw new Error(`Unsplash API Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Unsplash API data received:', data);
            
            if (!data.results || data.results.length === 0) {
                throw new Error('No trends data received from Unsplash');
            }

            const trendsData = data.results.map((photo, index) => ({
                id: index + 1,
                title: `Fashion Trend ${index + 1}`,
                description: photo.alt_description || 'Latest fashion trend',
                image: photo.urls.regular,
                category: ['Casual', 'Formal', 'Street Style', 'Seasonal'][index % 4]
            }));

            setTrends(trendsData);
            setUsingMockData(false);
            console.log('Successfully loaded trends from Unsplash API');
        } catch (err) {
            console.error('Error fetching trends:', err);
            setError(`Failed to load trends from Unsplash: ${err.message}. Using mock data instead.`);
            setTrends(mockTrendsData);
            setUsingMockData(true);
        } finally {
            setLoading(false);
        }
    };
            setLoading(true);
            setError('');

            const url = `https://api.unsplash.com/search/photos?query=fashion+trends+2024&per_page=12&orientation=portrait`;
            console.log('Fetching from URL:', url);

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Client-ID ${config.unsplashApiKey}`
                }
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                throw new Error(`Unsplash API Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Received data:', data);
            
            if (!data.results || data.results.length === 0) {
                throw new Error('No trends data received from Unsplash');
            }

            const trendsData = data.results.map((photo, index) => ({
                id: index + 1,
                title: `Fashion Trend ${index + 1}`,
                description: photo.alt_description || 'Latest fashion trend',
                image: photo.urls.regular,
                category: ['Casual', 'Formal', 'Street Style', 'Seasonal'][index % 4]
            }));

            setTrends(trendsData);
        } catch (err) {
            console.error('Error fetching trends from Unsplash, falling back to mock data:', err);
            setTrends(mockTrendsData);
            setUsingMockData(true);
            setError('');
        } finally {
            setLoading(false);
        }
    };

    const retryFetch = () => {
        fetchTrends();
    };

    if (loading) {
        return (
            <div className="container mx-auto px-6 py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading latest fashion trends...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-6 py-12">
                <div className="text-center">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 max-w-md mx-auto">
                        <h3 className="font-bold">Error:</h3>
                        <p>{error}</p>
                        <div className="mt-2 text-sm">
                            <p>Check the browser console for more details.</p>
                        </div>
                    </div>
                    <button 
                        onClick={retryFetch}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Fashion Trends 2024</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Discover the latest fashion trends curated by our AI and style experts.
                </p>
                {usingMockData && (
                    <div className="mt-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded max-w-md mx-auto">
                        <p className="text-sm">📋 Showing curated trends (API unavailable)</p>
                    </div>
                )}
            </div>

            {trends.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">No trends available at the moment.</p>
                    <button 
                        onClick={retryFetch}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Load Trends
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trends.map((trend) => (
                            <div key={trend.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                                <div className="relative h-64">
                                    <img 
                                        src={trend.image} 
                                        alt={trend.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300x400/f3f4f6/6b7280?text=Fashion+Trend';
                                        }}
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                                            {trend.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{trend.title}</h3>
                                    <p className="text-gray-600 mb-4">{trend.description}</p>
                                    <button className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-300">
                                        Learn More →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button 
                            onClick={retryFetch}
                            className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Refresh Trends
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TrendsPage;
