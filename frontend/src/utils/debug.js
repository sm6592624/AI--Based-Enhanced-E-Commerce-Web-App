// Debug utility to check environment variables
export const debugConfig = () => {
  console.log('Environment Variables Debug:');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('OpenAI API Key exists:', !!process.env.REACT_APP_OPENAI_API_KEY);
  console.log('OpenAI API Key length:', process.env.REACT_APP_OPENAI_API_KEY?.length || 0);
  console.log('Unsplash API Key exists:', !!process.env.REACT_APP_UNSPLASH_API_KEY);
  console.log('Unsplash API Key length:', process.env.REACT_APP_UNSPLASH_API_KEY?.length || 0);
  console.log('Unsplash API Key value:', process.env.REACT_APP_UNSPLASH_API_KEY);
  console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);
};
