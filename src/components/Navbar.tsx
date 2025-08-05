import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/productsPage', label: 'Products' },
    { path: '/contact', label: 'Contact' },
    { path: '/cart', label: 'Cart' },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`flex justify-between items-center px-6 py-4 shadow-md bg-white/90 backdrop-blur sticky top-0 z-10 ${className}`}
    >
      <h1 className="text-2xl font-bold text-rose-600">TRENDLANE</h1>
      <nav className="flex space-x-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <a
              key={item.path}
              href={item.path}
              className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'text-rose-600 bg-rose-50 shadow-sm'
                  : 'text-gray-700 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              {item.label}
              {item.path === '/cart' && cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </nav>
    </motion.header>
  );
} 