import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useProducts } from './hooks/useProducts';
import { SearchAndFilter } from './components/SearchAndFilter';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

export default function ProductsPage() {
  const navigate = useNavigate();

  const {
    products,
    categories,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters
  } = useProducts();

  const handleProductClick = (product: any) => {
    navigate('/productDetails', { state: { product } });
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-sky-50">
        <Navbar />
        <LoadingSpinner />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-sky-50">
        <Navbar />
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  // Main Page
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-sky-50 text-slate-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Navbar />

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-10 px-6 py-10 max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="lg:w-1/4 space-y-4">
  <h2 className="text-xl font-semibold mb-2">Categories</h2>
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => updateFilters({ category })}
      className={`block w-full text-left px-4 py-2 rounded transition ${
        filters.category === category
          ? 'bg-rose-100 text-rose-700 font-medium'
          : 'text-slate-700 hover:bg-sky-50'
      }`}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </button>
  ))}
</aside>


        {/* Main Content */}
        <main className="flex-1">
          {/* Search and Filter Bar */}
          <SearchAndFilter
            filters={filters}
            categories={categories}
            onFiltersChange={updateFilters}
            onReset={resetFilters}
          />

          {/* Results Count */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Products</h2>
            <p className="text-gray-600">{products.length} products found</p>
          </div>

          {/* Product Grid */}
          {products.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow-lg transition cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleProductClick(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded mb-3"
                    />
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-rose-600 font-medium">${product.price}</p>
                    <div className="flex items-center mt-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'fill-current'
                                : 'fill-gray-300'
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        ({product.rating})
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{product.category}</p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            // No Results
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={resetFilters}
                className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </main>
      </div>
    </motion.div>
  );
}
