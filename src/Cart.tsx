import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from './hooks/useCart';
import Navbar from './components/Navbar';

const itemFade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

export default function CartPage() {
  const { cartItems, removeItem, updateQuantity, getTotalPrice, isLoading } = useCart();
  


  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-sky-50 text-slate-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Navbar />

      {/* Cart Content */}
      <div className="px-6 py-10 max-w-4xl mx-auto">
        <motion.h1
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Your Cart
        </motion.h1>

        {cartItems.length === 0 ? (
          <motion.p
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your cart is empty.
          </motion.p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center gap-4 border-b pb-4"
                  custom={index}
                  variants={itemFade}
                  initial="hidden"
                  animate="visible"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h2 className="font-medium">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      Size: {item.size} | ${item.price} × {item.quantity}
                    </p>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs hover:bg-rose-50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                    >
                      -
                    </motion.button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <motion.button
                      className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs hover:bg-rose-50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                    >
                      +
                    </motion.button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-rose-600">
                      ${item.price * item.quantity}
                    </p>
                    <motion.button
                      className="text-xs text-red-500 hover:text-red-700 mt-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeItem(item.id, item.size)}
                    >
                      Remove
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <motion.div
              className="mt-10 border-t pt-4 flex justify-between items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-lg font-medium">Total</span>
              <span className="text-2xl font-bold text-rose-600">${getTotalPrice()}</span>
            </motion.div>

            {/* Checkout Button */}
            <motion.button
              className="mt-6 bg-rose-600 text-white px-6 py-2 rounded-full shadow hover:bg-rose-700 transition"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              Proceed to Checkout
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}
