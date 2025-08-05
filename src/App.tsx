import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Homepage from './Homepage';
import CartPage from './Cart';
import ProductDetails from './ProductDetails';
import ProductsPage from './productsPage';
import ContactPage from './Contact';
import { PageTransition } from './components/PageTransition';

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Homepage />
          </PageTransition>
        } />
        <Route path="/productDetails" element={
          <PageTransition>
            <ProductDetails />
          </PageTransition>
        } />
        <Route path="/cart" element={
          <PageTransition>
            <CartPage />
          </PageTransition>
        } />
        <Route path="/productsPage" element={
          <PageTransition>
            <ProductsPage />
          </PageTransition>
        } />
        <Route path="/contact" element={
          <PageTransition>
            <ContactPage />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full max-w-none">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
