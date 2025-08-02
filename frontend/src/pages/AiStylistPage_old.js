// src/pages/AiStylistPage.js
import React, { useState } from 'react';
import config, { validateConfig } from '../config/env';
import { mockAIRecommendations } from '../data/mockData';

const AiStylistPage = () => {
    const [image, setImage] = useState(null);
    const [preferences, setPreferences] = useState({
        style: '',
        occasion: '',
        budget: '',
        bodyType: ''
    });
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Validate config on component mount
    React.useEffect(() => {
        try {
            validateConfig();
        } catch (err) {
            setError(`API configuration error: ${err.message}`);
        }
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('Image size should be less than 5MB');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target.result);
            reader.onerror = () => setError('Failed to read image file');
            reader.readAsDataURL(file);
            setError('');
        }
    };

    const handlePreferenceChange = (key, value) => {
        setPreferences(prev => ({ ...prev, [key]: value }));
    };

    const getStyleRecommendations = async () => {
        if (!image) {
            setError('Please upload an image first');
            return;
        }

        // Use mock data if API key is not available or if configured to use mock data
        if (!config.openaiApiKey || config.useMockData) {
            setLoading(true);
            setError('');
            
            // Simulate API delay
            setTimeout(() => {
                const randomRecommendation = mockAIRecommendations[Math.floor(Math.random() * mockAIRecommendations.length)];
                setRecommendations([randomRecommendation]);
                setLoading(false);
            }, 2000);
            return;
        }

        setLoading(true);
        setError('');

        try {
            console.log('Making OpenAI API request...');
            
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.openaiApiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-4-vision-preview",
                    messages: [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: `Analyze this image and provide fashion recommendations based on:
                                    - Style preference: ${preferences.style || 'Not specified'}
                                    - Occasion: ${preferences.occasion || 'Not specified'}
                                    - Budget: ${preferences.budget || 'Not specified'}
                                    - Body type: ${preferences.bodyType || 'Not specified'}
                                    
                                    Please provide specific clothing recommendations with explanations.`
                                },
                                {
                                    type: "image_url",
                                    image_url: {
                                        url: image
                                    }
                                }
                            ]
                        }
                    ],
                    max_tokens: 500
                })
            });

            console.log('OpenAI API response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('OpenAI API error:', errorData);
                throw new Error(errorData.error?.message || `API Error: ${response.status}`);
            }

            const data = await response.json();
            console.log('OpenAI API response data:', data);
            
            const recommendation = data.choices[0]?.message?.content;
            
            if (recommendation) {
                setRecommendations([recommendation]);
            } else {
                throw new Error('No recommendations received from AI');
            }
        } catch (err) {
            console.error('Error getting recommendations, falling back to mock data:', err);
            // Fall back to mock data on API error
            const randomRecommendation = mockAIRecommendations[Math.floor(Math.random() * mockAIRecommendations.length)];
            setRecommendations([randomRecommendation]);
            setError('');
        } finally {
            setLoading(false);
        }
    };

    const styleOptions = ['Casual', 'Business', 'Formal', 'Bohemian', 'Minimalist', 'Trendy'];
    const occasionOptions = ['Work', 'Date Night', 'Party', 'Vacation', 'Wedding', 'Everyday'];
    const budgetOptions = ['Under $100', '$100-$300', '$300-$500', '$500+'];
    const bodyTypeOptions = ['Pear', 'Apple', 'Hourglass', 'Rectangle', 'Inverted Triangle'];

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Personal Stylist</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Upload your photo and let our AI analyze your style to provide personalized fashion recommendations.
                </p>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 max-w-2xl mx-auto">
                    <h3 className="font-bold">Error:</h3>
                    <p>{error}</p>
                    <div className="mt-2 text-sm">
                        <p>Check the browser console for more details.</p>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Upload Your Photo</h2>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        {image ? (
                            <div>
                                <img src={image} alt="Uploaded" className="max-w-full h-64 object-cover mx-auto rounded-lg mb-4" />
                                <button 
                                    onClick={() => setImage(null)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Remove Image
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="text-gray-400 mb-4">
                                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label htmlFor="image-upload" className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
                                    Choose Image
                                </label>
                                <p className="text-sm text-gray-500 mt-2">Maximum file size: 5MB</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Preferences Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Style Preferences</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Style Preference</label>
                            <select 
                                value={preferences.style} 
                                onChange={(e) => handlePreferenceChange('style', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select style</option>
                                {styleOptions.map(style => (
                                    <option key={style} value={style}>{style}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
                            <select 
                                value={preferences.occasion} 
                                onChange={(e) => handlePreferenceChange('occasion', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select occasion</option>
                                {occasionOptions.map(occasion => (
                                    <option key={occasion} value={occasion}>{occasion}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                            <select 
                                value={preferences.budget} 
                                onChange={(e) => handlePreferenceChange('budget', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select budget</option>
                                {budgetOptions.map(budget => (
                                    <option key={budget} value={budget}>{budget}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Body Type</label>
                            <select 
                                value={preferences.bodyType} 
                                onChange={(e) => handlePreferenceChange('bodyType', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select body type</option>
                                {bodyTypeOptions.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <button 
                            onClick={getStyleRecommendations}
                            disabled={loading || !image}
                            className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
                        >
                            {loading ? 'Analyzing...' : 'Get Style Recommendations'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Recommendations Section */}
            {recommendations.length > 0 && (
                <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Your Style Recommendations</h2>
                    <div className="prose max-w-none">
                        {recommendations.map((rec, index) => (
                            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                                <p className="whitespace-pre-wrap">{rec}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AiStylistPage;
