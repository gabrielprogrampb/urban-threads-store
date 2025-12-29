
import React, { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { isCartOpen, toggleCart, cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/50 z-50"
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 shadow-lg z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button onClick={toggleCart} className="text-gray-400 hover:text-white">&times;</button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                <p className="text-gray-400">Your cart is empty.</p>
                <Link to="/shop" onClick={toggleCart} className="mt-4 inline-block bg-white text-black font-bold py-2 px-6 uppercase tracking-wider hover:bg-gray-200 transition-colors duration-300">
                    Continue Shopping
                </Link>
              </div>
            ) : (
              <Fragment>
                <div className="flex-grow overflow-y-auto p-6">
                  <ul className="space-y-4">
                    {cart.map(item => (
                      <li key={item.id} className="flex items-center gap-4">
                        <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded"/>
                        <div className="flex-grow">
                          <h3 className="font-bold">{item.name}</h3>
                          <p className="text-gray-400">${item.price.toFixed(2)}</p>
                          <div className="flex items-center mt-2">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-800 rounded">-</button>
                            <span className="px-3">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-800 rounded">+</button>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 text-xs">Remove</button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 border-t border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Subtotal</span>
                    <span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <Link to="/checkout" onClick={toggleCart} className="block w-full text-center bg-white text-black font-bold py-3 uppercase tracking-wider hover:bg-gray-200 transition-colors duration-300">
                    Checkout
                  </Link>
                  <button onClick={clearCart} className="w-full mt-2 text-gray-400 hover:text-white text-sm">
                    Clear Cart
                  </button>
                </div>
              </Fragment>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;