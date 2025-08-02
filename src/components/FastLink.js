// src/components/FastLink.js
import React from 'react';
import { Link } from 'react-router-dom';

const FastLink = ({ to, children, className, onClick, ...props }) => {
    const handleClick = (e) => {
        // Ensure immediate navigation without delays
        if (onClick) {
            onClick(e);
        }
        
        // Force immediate navigation for better UX
        setTimeout(() => {
            if (!e.defaultPrevented) {
                window.location.hash = to;
            }
        }, 0);
    };

    return (
        <Link 
            to={to} 
            className={className} 
            onClick={handleClick}
            {...props}
        >
            {children}
        </Link>
    );
};

export default FastLink;
