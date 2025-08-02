// src/hooks/useRouterPreload.js
import { useEffect } from 'react';

export const useRouterPreload = () => {
    useEffect(() => {
        // Temporarily disable preloading to fix navigation issues
        console.log('Router preloading disabled for debugging navigation issues');
        return () => {
            // Cleanup function
            console.log('Router preload cleanup');
        };
    }, []);
};

export default useRouterPreload;
