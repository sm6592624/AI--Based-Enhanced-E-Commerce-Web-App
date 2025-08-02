const config = {
  openaiApiKey: process.env.REACT_APP_OPENAI_API_KEY,
  unsplashApiKey: process.env.REACT_APP_UNSPLASH_API_KEY,
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  useMockData: process.env.REACT_APP_USE_MOCK_DATA === 'true' || !process.env.REACT_APP_UNSPLASH_API_KEY,
};

// Enhanced validation function
export const validateConfig = () => {
  const requiredKeys = ['openaiApiKey', 'unsplashApiKey'];
  const missingKeys = requiredKeys.filter(key => !config[key]);
  
  console.log('Config validation:', config);
  
  if (missingKeys.length > 0) {
    console.error('Missing required environment variables:', missingKeys);
    console.log('Available env vars:', {
      REACT_APP_OPENAI_API_KEY: process.env.REACT_APP_OPENAI_API_KEY ? 'SET' : 'MISSING',
      REACT_APP_UNSPLASH_API_KEY: process.env.REACT_APP_UNSPLASH_API_KEY ? 'SET' : 'MISSING'
    });
    
    if (config.isProduction) {
      throw new Error(`Missing required environment variables: ${missingKeys.join(', ')}`);
    }
  }
};

export default config;