// src/components/Footer.js
import React from 'react';

const Footer = () => (
    <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-8">
            <div className="md:flex justify-between items-center">
                <div className="mb-6 md:mb-0">
                    <h3 className="text-2xl font-bold">Aura</h3>
                    <p className="text-gray-400">The Future of E-Commerce.</p>
                </div>
                <div className="flex flex-wrap justify-center space-x-6">
                    <a href="/about" className="text-gray-400 hover:text-white transition duration-300">About</a>
                    <a href="/contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a>
                    <a href="/privacy" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
                    <a href="/terms" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400">
                &copy; {new Date().getFullYear()} Aura. All rights reserved.
            </div>
        </div>
    </footer>
);

export default Footer;
