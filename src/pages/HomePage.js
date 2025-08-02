// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
    <>
        <section className="bg-cover bg-center h-screen -mt-20 pt-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}>
            <div className="h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Your Personal AI Shopping Assistant</h1>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Discover your perfect style, curated by cutting-edge AI. Effortless, intelligent, and uniquely you.</p>
                    <Link to="/shop" className="bg-white text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105 inline-block">Shop Now</Link>
                </div>
            </div>
        </section>
    </>
);

export default HomePage;
