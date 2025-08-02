// Test script to verify Unsplash API
const testUnsplashAPI = async () => {
    const apiKey = 'Sd9IVRrKWVCgSw29vzG3MkqC5xWvwXv_wxXoFLs7WuA';
    
    console.log('Testing Unsplash API...');
    console.log('API Key length:', apiKey.length);
    
    try {
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=fashion&per_page=3`,
            {
                headers: {
                    'Authorization': `Client-ID ${apiKey}`
                }
            }
        );
        
        console.log('Response status:', response.status);
        console.log('Response headers:', [...response.headers.entries()]);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', errorText);
            return;
        }
        
        const data = await response.json();
        console.log('Success! Received data:');
        console.log('- Total results:', data.total);
        console.log('- Results count:', data.results.length);
        console.log('- First image URL:', data.results[0]?.urls?.small);
        
    } catch (error) {
        console.error('Network error:', error);
    }
};

// Run the test
testUnsplashAPI();
