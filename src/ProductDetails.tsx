import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "./hooks/useCart";
import Navbar from "./components/Navbar";

import denimJacket from "./assets/denimJacket.jpeg";

// Default product data in case no product is passed
const defaultProduct = {
  id: 1,
  name: "Denim Jacket",
  price: "$89",
  description:
    "A timeless denim jacket with a relaxed fit. Perfect for layering year-round.",
  image: denimJacket,
  sizes: ["S", "M", "L", "XL"],
  material: "100% Cotton Denim",
  fit: "Relaxed Fit",
};

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const product = location.state?.product || defaultProduct;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize,
      description: product.description,
    };

    addItem(cartItem);

    alert("Added to cart!");
  };

  console.log("prodytccc", product);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-sky-50 text-slate-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Navbar />

      {/* Page Content */}
      <div className="px-6 py-10">
        {/* Back Link */}
        <motion.button
          onClick={() => navigate("/productsPage")}
          className="text-sm text-rose-500 hover:underline mb-8 inline-block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          ← Back to Products
        </motion.button>

        {/* Product Section */}
        <motion.div
          className="flex flex-col lg:flex-row gap-12 items-start lg:items-center max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
        >
          {/* Image */}
          <motion.div className="flex-1" variants={fadeIn} custom={1}>
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full max-w-md h-auto object-cover rounded-xl shadow-md mx-auto lg:mx-0"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 150 }}
            />
          </motion.div>

          {/* Info */}
          <motion.div className="flex-1" variants={fadeIn} custom={2}>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-xl text-rose-600 mt-2">${product.price}</p>
              </div>

              <p className="text-base text-slate-700 leading-relaxed text-left">
                {product.description}
              </p>


              {product.category === "electronics" ||
              product.category === "jewelery" ? (
                <></>
              ) : (
                <>
                  {/* Product Details */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-slate-600">
                        Material:
                      </span>
                      <span className="text-sm text-slate-700">
                        {product.material || "Cotton"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-slate-600">
                        Fit:
                      </span>
                      <span className="text-sm text-slate-700">
                        {product.fit || "Regular Fit"}
                      </span>
                    </div>
                  </div>

                  {/* Size Selector */}

                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2 text-left">
                      Size
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map((size: string) => (
                        <motion.button
                          key={size}
                          className={`border px-4 py-2 rounded-md text-sm transition ${
                            selectedSize === size
                              ? "border-rose-500 bg-rose-50 text-rose-700"
                              : "border-slate-300 hover:bg-rose-50"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </>
              )}


              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-current"
                          : "fill-gray-300"
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

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2 text-left">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <motion.button
                    className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-rose-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </motion.button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <motion.button
                    className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-rose-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </motion.button>
                </div>
              </div>

              {/* Add to Cart */}
              <motion.button
                className="bg-rose-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-rose-700 transition w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
