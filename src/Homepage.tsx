import { useNavigate } from 'react-router-dom';
import './App.css';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import { useProducts } from './hooks/useProducts';
import { LoadingSpinner } from './components/LoadingSpinner';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

function Homepage() {
    const navigate = useNavigate();
    const { products, loading } = useProducts();

    const handleProductClick = (product: any) => {
        navigate('/productDetails', { state: { product } });
    };

    // Get first 3 products for featured section
    const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-sky-50 text-gray-800">
      <Navbar />

      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center py-20 px-4 bg-gradient-to-r from-sky-100 to-rose-100"
      >
        <motion.h2
          className="text-4xl font-bold mb-4 text-slate-800"
          variants={fadeInUp}
          custom={1}
        >
          Summer '25 Collection
        </motion.h2>
        <motion.p
          className="text-slate-600 text-lg mb-6"
          variants={fadeInUp}
          custom={2}
        >
          Light, breathable, and bold styles to elevate your season.
        </motion.p>
        <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-rose-600 hover:bg-rose-700 transition text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl"
      onClick={() => navigate('/productsPage')}
    >
      Shop Now
    </motion.button>
      </motion.section>

      {/* Featured Products */}
      <section className="pt-4">
        <motion.h3
          className="text-3xl font-semibold mb-4 text-slate-800 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Featured Pieces
        </motion.h3>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-6">
            {featuredProducts.map((p, index) => (
              <motion.div
                key={p.id}
                className="bg-white border border-gray-200 p-5 rounded-xl hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index + 1}
                onClick={() => handleProductClick(p)}
                whileHover={{ scale: 1.02 }}
              >
                <motion.img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                />
                <h4 className="text-lg font-semibold text-slate-900">{p.name}</h4>
                <p className="text-md text-rose-600">${p.price}</p>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(p.rating) ? 'fill-current' : 'fill-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({p.rating})</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Homepage;
