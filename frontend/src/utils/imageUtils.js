// src/utils/imageUtils.js

/**
 * Get fashion-related Unsplash image based on product category and name
 */
export const getUnsplashFashionImage = (productName, category = 'fashion', width = 400, height = 500) => {
    // Clean product name for search
    const searchTerm = productName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .trim()
        .split(' ')
        .filter(word => word.length > 2)
        .slice(0, 3)
        .join(' ');
    
    // Category-specific search terms
    const categoryTerms = {
        'Tops': 'shirt blouse top fashion',
        'Bottoms': 'pants jeans skirt fashion',
        'Dresses': 'dress gown fashion',
        'Jackets': 'jacket coat blazer fashion',
        'Shoes': 'shoes sneakers boots fashion',
        'default': 'fashion clothing style'
    };
    
    const searchQuery = searchTerm || categoryTerms[category] || categoryTerms.default;
    
    return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(searchQuery)}&fashion&clothing`;
};

/**
 * Get placeholder image with custom text
 */
export const getPlaceholderImage = (text, width = 400, height = 500, bgColor = 'f3f4f6', textColor = '6b7280') => {
    return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

/**
 * Generate multiple fallback image sources
 */
export const getImageFallbacks = (product) => {
    const { name, category, imageUrl } = product;
    
    return [
        // Original image
        imageUrl,
        // Unsplash fashion image
        getUnsplashFashionImage(name, category),
        // Generic category image
        getUnsplashFashionImage('', category),
        // Generic fashion image
        getUnsplashFashionImage('fashion clothing'),
        // Placeholder as final fallback
        getPlaceholderImage(name)
    ].filter(Boolean); // Remove null/undefined values
};

/**
 * Preload an image to check if it's valid
 */
export const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
        img.src = src;
    });
};

/**
 * Find the first working image from a list of sources
 */
export const findWorkingImage = async (imageSources) => {
    for (const src of imageSources) {
        try {
            await preloadImage(src);
            return src;
        } catch (error) {
            console.log(`Failed to load image: ${src}`);
            continue;
        }
    }
    // Return placeholder as final fallback
    return getPlaceholderImage('Image Not Available');
};
