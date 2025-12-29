
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category, Product } from '../types';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const ShopPage: React.FC = () => {
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [priceRange, setPriceRange] = useState(100);

  useEffect(() => {
    let newFilteredProducts = products;

    if (activeCategory !== 'All') {
      newFilteredProducts = newFilteredProducts.filter(p => p.category === activeCategory);
    }

    newFilteredProducts = newFilteredProducts.filter(p => p.price <= priceRange);

    setFilteredProducts(newFilteredProducts);
  }, [activeCategory, priceRange, products]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black tracking-wider">Our Collection</h1>
        <p className="text-gray-400 mt-2">Discover our curated selection of urban wear.</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-1/4">
          <div className="p-6 bg-gray-900 rounded-lg sticky top-28">
            <h3 className="text-xl font-bold mb-4">Filters</h3>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Category</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveCategory('All')} className={`w-full text-left transition-colors ${activeCategory === 'All' ? 'text-white font-bold' : 'text-gray-400'} hover:text-white`}>All</button></li>
                <li><button onClick={() => setActiveCategory(Category.Caps)} className={`w-full text-left transition-colors ${activeCategory === Category.Caps ? 'text-white font-bold' : 'text-gray-400'} hover:text-white`}>{Category.Caps}</button></li>
                <li><button onClick={() => setActiveCategory(Category.Tshirts)} className={`w-full text-left transition-colors ${activeCategory === Category.Tshirts ? 'text-white font-bold' : 'text-gray-400'} hover:text-white`}>{Category.Tshirts}</button></li>
              </ul>
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="font-semibold mb-3">Price</h4>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-white" 
              />
              <div className="text-right text-gray-400 mt-2">Up to ${priceRange}</div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <motion.div 
          className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants} exit="exit" layout>
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
                <p className="text-gray-400 col-span-full text-center">No products match the current filters.</p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ShopPage;
