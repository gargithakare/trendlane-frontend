# 🛍️ Trendlane - Modern E-Commerce UI

A beautiful, responsive e-commerce application built with React, TypeScript, Tailwind CSS, and Framer Motion. Features dynamic product data from APIs, advanced search and filtering, persistent cart management, and smooth page transitions.

## ✨ Features

### 🛒 **Shopping Experience**
- **Dynamic Product Catalog**: Fetches products from FakeStore API with fallback to local data
- **Advanced Search & Filtering**: Search by name, filter by category, price range, and sort options
- **Product Details**: Comprehensive product information with size selection and quantity controls
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)

### 🎨 **UI/UX Features**
- **Smooth Animations**: Page transitions and micro-interactions using Framer Motion
- **Active Navigation**: Visual feedback for current page with animated indicators
- **Loading States**: Elegant loading spinners and error handling
- **Modern Design**: Clean, modern UI with Tailwind CSS

### 🛍️ **Cart Management**
- **Persistent Cart**: Cart data persists across browser sessions using localStorage
- **Quantity Controls**: Add/remove items with quantity adjustments
- **Size Selection**: Products with multiple size options
- **Cart Badge**: Real-time cart count in navigation
- **Remove Items**: Easy item removal from cart

### 🔍 **Search & Filter**
- **Real-time Search**: Instant search across product names and descriptions
- **Category Filtering**: Filter by product categories
- **Price Range**: Set minimum and maximum price filters
- **Sort Options**: Sort by name, price, or rating (ascending/descending)
- **Reset Filters**: One-click filter reset

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **State Management**: Custom hooks with localStorage
- **API Integration**: Fetch API with error handling
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation with cart badge
│   ├── SearchAndFilter.tsx  # Search and filter controls
│   ├── LoadingSpinner.tsx   # Loading animation
│   ├── ErrorMessage.tsx     # Error display
│   └── PageTransition.tsx   # Page transition animations
├── hooks/              # Custom React hooks
│   ├── useCart.ts      # Cart management with localStorage
│   └── useProducts.ts  # Product data and filtering
├── services/           # API services
│   └── api.ts         # FakeStore API integration
├── pages/              # Main application pages
│   ├── Homepage.tsx    # Landing page
│   ├── ProductsPage.tsx # Product catalog
│   ├── ProductDetails.tsx # Individual product view
│   ├── Cart.tsx        # Shopping cart
│   └── Contact.tsx     # Contact form
└── assets/             # Static assets
    └── *.jpeg         # Product images
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fashionista
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Key Features Implementation

### API Integration
- **Primary**: FakeStore API (https://fakestoreapi.com)
- **Fallback**: Local JSON data
- **Error Handling**: Graceful degradation with user feedback

### Cart Persistence
- **localStorage**: Cart data persists across browser sessions
- **Real-time Updates**: Cart updates immediately across all components
- **Size-based Items**: Same product in different sizes treated as separate items

### Search & Filter
- **Debounced Search**: Real-time search with performance optimization
- **Multiple Filters**: Category, price range, and sorting options
- **Reset Functionality**: One-click filter reset

### Page Transitions
- **AnimatePresence**: Smooth page transitions
- **Custom Animations**: Framer Motion for micro-interactions
- **Loading States**: Elegant loading and error states

## 🎯 Best Practices

### Code Quality
- **TypeScript**: Full type safety
- **Custom Hooks**: Reusable logic separation
- **Component Composition**: Modular, reusable components
- **Error Boundaries**: Graceful error handling

### Performance
- **Lazy Loading**: Components load on demand
- **Optimized Images**: Proper image sizing and formats
- **Debounced Search**: Prevents excessive API calls
- **Memoization**: React.memo for expensive components

### Accessibility
- **Semantic HTML**: Proper heading hierarchy
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and descriptions
- **Color Contrast**: WCAG compliant color schemes

## 🔮 Future Enhancements

- [ ] **User Authentication**: Login/signup functionality
- [ ] **Wishlist**: Save favorite products
- [ ] **Product Reviews**: User ratings and comments
- [ ] **Payment Integration**: Stripe/PayPal checkout
- [ ] **Order History**: Track past purchases
- [ ] **Dark Mode**: Toggle between light/dark themes
- [ ] **PWA**: Progressive Web App features
- [ ] **Internationalization**: Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@gargithakare](https://github.com/gargithakare?tab=repositories)
- LinkedIn: [Gargi Thakare](https://www.linkedin.com/in/gargi-thakare/)

---

⭐ **Star this repository if you found it helpful!**
