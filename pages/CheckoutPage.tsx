
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types';

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    if (cart.length > 0) {
      setOrderItems([...cart]);
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setOrderTotal(total);
      clearCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg text-center"
      >
        {orderItems.length > 0 ? (
          <>
            <h1 className="text-4xl font-black tracking-wider text-green-400">Thank You!</h1>
            <p className="text-gray-400 mt-2">Your order has been placed successfully.</p>
            
            <div className="text-left my-8 border-t border-b border-gray-700 py-6">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                {orderItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-2">
                        <span className="text-gray-300">{item.name} x{item.quantity}</span>
                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-700">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-xl font-bold">${orderTotal.toFixed(2)}</span>
                </div>
            </div>

          </>
        ) : (
          <>
            <h1 className="text-4xl font-black tracking-wider">Checkout</h1>
            <p className="text-gray-400 mt-4">Your cart was empty, or your order has already been processed.</p>
          </>
        )}
        <Link
          to="/shop"
          className="inline-block mt-4 bg-white text-black font-bold py-3 px-8 uppercase tracking-wider hover:bg-gray-200 transition-colors duration-300"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;
