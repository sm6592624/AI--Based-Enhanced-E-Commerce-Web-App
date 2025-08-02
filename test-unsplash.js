// Test Unsplash API directly
const testUnsplashAPI = async () => {
  const apiKey = 'Sd9IVRrKWVCgSw29vzG3MkqC5xWvwXv_wxXoFLs7WuA';
  
  try {
    const response = await fetch('https://api.unsplash.com/photos/random', {
      headers: {
        'Authorization': `Client-ID ${apiKey}`
      }
    });
    
    console.log('Test response status:', response.status);
    const data = await response.json();
    console.log('Test response data:', data);
    
    if (response.ok) {
      console.log('✅ Unsplash API key is working!');
    } else {
      console.log('❌ API Error:', data);
    }
  } catch (error) {
    console.error('❌ Network error:', error);
  }
};

// Run the test
testUnsplashAPI();
