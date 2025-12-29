
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
        <h1 className="text-4xl font-bold">Product Not Found</h1>
        <p className="mt-4 text-gray-400">Sorry, we couldn't find the product you're looking for.</p>
        <Link to="/shop" className="mt-8 inline-block bg-white text-black font-bold py-3 px-8 uppercase tracking-wider hover:bg-gray-200 transition-colors duration-300">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden"
        >
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover"/>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-gray-400 text-sm uppercase tracking-widest">{product.category}</p>
          <h1 className="text-4xl md:text-5xl font-black my-3">{product.name}</h1>
          <p className="text-3xl font-bold text-gray-300 mb-6">${product.price.toFixed(2)}</p>
          <p className="text-gray-400 leading-relaxed mb-8">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-white text-black font-bold py-4 px-8 uppercase tracking-wider hover:bg-gray-200 transition-colors duration-300"
          >
            Add to Cart
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
