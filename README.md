# Aura E-Commerce Platform

[![Vercel Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-brightgreen)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19+-blue)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0+-06B6D4)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern e-commerce web application built with React, featuring an AI-powered styling assistant to help users discover products that match their personal style preferences.

## What's Inside

This project started as an experiment to combine modern web development with artificial intelligence to create a better shopping experience. Here's what I've built so far:

**AI Styling Assistant**
The core feature is an AI-powered stylist that analyzes user preferences and suggests products. While still in development, it demonstrates how machine learning can personalize the shopping experience.

**Complete Shopping Experience**
- Browse products with filtering and search capabilities
- Add items to cart and manage quantities
- User authentication with login/register functionality
- Responsive design that works on all devices
- Clean, modern interface built with Tailwind CSS

**Key Pages**
- Homepage with featured products and hero section
- Product catalog with category filtering
- Individual product detail pages
- AI Stylist interface for personalized recommendations
- User profile and checkout pages
- Trends page showcasing popular items

## Demo

You can see the live application here: [Aura E-Commerce](https://your-vercel-url.vercel.app)

*Note: This is a portfolio project built for demonstration purposes. The AI features are prototypes and payment processing is simulated.*

## 📸 Screenshots

### Home Page
<img width="1907" height="822" alt="image" src="https://github.com/user-attachments/assets/f66d5623-4643-46f0-80f1-b20c7dcb228c" />



### AI Stylist Interface
![AI Stylist](https://via.placeholder.com/800x400?text=AI+Stylist+Screenshot)

### Product Catalog
![Shop Page](https://via.placeholder.com/800x400?text=Shop+Page+Screenshot)

## Technology Stack

I chose these technologies for their reliability and developer experience:

**Frontend Framework**
- React 19 with modern hooks and functional components
- React Router for client-side navigation
- Context API for state management (cart, authentication)

**Styling & UI**
- Tailwind CSS for utility-first styling
- Headless UI for accessible components
- Heroicons for consistent iconography
- Responsive design principles

**Build & Development**
- Create React App for zero-config setup
- PostCSS and Autoprefixer for CSS processing
- ESLint for code quality

**Deployment**
- Vercel for hosting and continuous deployment
- GitHub for version control

## Getting Started

To run this project locally, you'll need Node.js installed on your machine.

**What you'll need:**
- Node.js (version 16 or higher)
- npm (comes with Node.js)
- Git

**Quick Setup:**

1. Clone this repository:
```bash
git clone https://github.com/sm6592624/AI--Based-Enhanced-E-Commerce-Web-App.git
cd AI--Based-Enhanced-E-Commerce-Web-App
```

2. Install the dependencies:
```bash
npm install
```

3. Create your environment file:
Copy `.env.example` to `.env` and add your API keys if you want to test the AI features:
```env
REACT_APP_UNSPLASH_ACCESS_KEY=your_unsplash_key_here
# Add other API keys as needed
```

4. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## 🚀 Deployment

### Deploy to Vercel
1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Deploy to Netlify
1. Build the project:
   ```bash
   npm run build
   ```

2. Drag and drop the `build` folder to [Netlify](https://netlify.com)

## Project Structure

Here's how I organized the code:

```
src/
├── components/          # Reusable UI pieces
│   ├── Header.js       # Navigation bar
│   ├── Footer.js       # Site footer
│   ├── CartSidebar.js  # Shopping cart drawer
│   └── auth/           # Login/register forms
├── pages/              # Main application pages
│   ├── HomePage.js     # Landing page
│   ├── ShopPage.js     # Product browsing
│   ├── AiStylistPage.js # AI recommendation interface
│   └── CheckoutPage.js # Purchase flow
├── context/            # React state management
│   ├── CartContext.js  # Shopping cart state
│   └── AuthContext.js  # User authentication
├── data/               # Mock data and product info
├── utils/              # Helper functions
└── App.js              # Main application component
```

The styling uses Tailwind CSS classes throughout the components for a consistent design system.

## 🎯 Available Scripts

### Development
```bash
npm start          # Start development server
npm test           # Run test suite
npm run build      # Build for production
npm run eject      # Eject from Create React App
```

### Code Quality
```bash
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## 🔧 Configuration

### TailwindCSS Customization
Edit `tailwind.config.js` to customize the design system:
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    },
  },
  plugins: [],
}
```

### Environment Variables
- `REACT_APP_API_URL`: Backend API endpoint
- `REACT_APP_UNSPLASH_ACCESS_KEY`: Unsplash API key for images
- `REACT_APP_STRIPE_PUBLIC_KEY`: Stripe public key for payments

## Contributing

I welcome contributions! If you'd like to help improve this project:

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Test everything works
5. Submit a pull request

Please keep the code style consistent and add comments for complex functionality.

## Future Plans

Some things I'm planning to add:

- **Real Backend**: Currently using mock data, planning to build a proper API
- **Payment Integration**: Add Stripe or PayPal for actual transactions
- **Enhanced AI**: More sophisticated recommendation algorithms
- **Mobile App**: React Native version for iOS/Android
- **Admin Dashboard**: Interface for managing products and orders

## About This Project

I built this as a learning project to explore how AI can enhance e-commerce experiences. It showcases modern React development practices, responsive design, and demonstrates how to structure a larger frontend application.

The AI features are currently prototypes, but they show the potential for personalizing online shopping experiences.

## Contact

Feel free to reach out if you have questions or suggestions:

- GitHub: [@sm6592624](https://github.com/sm6592624)
- Project Link: [https://github.com/sm6592624/AI--Based-Enhanced-E-Commerce-Web-App](https://github.com/sm6592624/AI--Based-Enhanced-E-Commerce-Web-App)

## License

This project is open source and available under the [MIT License](LICENSE).

---

Thanks for checking out my project! If you find it useful, please consider giving it a star ⭐

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
