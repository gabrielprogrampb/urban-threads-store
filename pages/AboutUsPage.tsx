import React from 'react';
import { motion } from 'framer-motion';

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-wider">THE HEART OF THE STREET</h1>
          <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
            We are more than a brand. We are a canvas for self-expression, rooted in the vibrant culture of urban life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img 
              src="https://picsum.photos/seed/aboutus/800/900" 
              alt="Urban fashion" 
              className="rounded-lg object-cover w-full h-full max-h-[600px]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-6 text-gray-300"
          >
            <h2 className="text-3xl font-bold text-white">Our Story</h2>
            <p>
              Urban Threads was born from the pavement, the art, and the energy of the city. We saw a world full of individuals looking for ways to tell their own stories. Our mission became to provide the uniform for that narrative.
            </p>
            <p>
              We started with a simple idea: create high-quality, stylish caps and tees that felt both timeless and modern. Every piece we design is crafted with meticulous attention to detail, from the choice of fabric to the precision of the stitching. We believe that what you wear is a reflection of who you are, and it should be made to last.
            </p>
            <h2 className="text-3xl font-bold text-white mt-8">What We Stand For</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Quality Craftsmanship:</span> Premium materials and construction you can feel.</li>
              <li><span className="font-bold">Authentic Design:</span> Styles inspired by real street culture and art.</li>
              <li><span className="font-bold">Community:</span> Building a tribe of individuals who aren't afraid to stand out.</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;