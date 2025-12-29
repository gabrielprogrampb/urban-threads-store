
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const ParallaxBanner: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={ref}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://picsum.photos/seed/banner/1920/1080)",
          y: backgroundY,
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <motion.div
        className="relative z-10 text-center text-white"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-widest"
        >
          New Collection
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 text-lg md:text-xl font-light"
        >
          Style That Defines You
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <Link
            to="/shop"
            className="inline-block bg-white text-black font-bold py-3 px-8 uppercase tracking-wider hover:bg-gray-200 transition-colors duration-300"
          >
            View Collection
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const { products } = useProducts();
  const featuredProducts = products.filter(p => p.isFeatured);

  return (
    <div>
      <ParallaxBanner />
      <div className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <div className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Join The Movement</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Follow us on social media for the latest drops, behind-the-scenes content, and more.</p>
            <div className="flex justify-center space-x-6 text-2xl">
                 <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                 <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                 <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
