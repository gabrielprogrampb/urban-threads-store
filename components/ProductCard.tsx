
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 20;
    const y = (clientY - top - height / 2) / 20;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  const springConfig = { stiffness: 300, damping: 20, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-10, 10], ['-5deg', '5deg']);
  const rotateY = useTransform(springX, [-10, 10], ['5deg', '-5deg']);

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
        }}
        className="relative group overflow-hidden rounded-lg bg-gray-800 h-full"
      >
        <motion.img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          style={{
            transform: 'translateZ(20px)',
            backfaceVisibility: 'hidden',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 p-4 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
          <h3 className="text-white text-lg font-bold">{product.name}</h3>
          <p className="text-gray-300 font-semibold">${product.price.toFixed(2)}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
