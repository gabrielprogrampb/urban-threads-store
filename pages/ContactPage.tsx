
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ContactSubmission } from '../types';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState({ name: false, email: false, message: false });

  const validateForm = () => {
    const newErrors = {
      name: name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(email),
      message: message.trim() === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setStatus('sending');

    // Simulate API call
    setTimeout(() => {
      try {
        const newSubmission: ContactSubmission = {
          id: crypto.randomUUID(),
          name,
          email,
          message,
          timestamp: new Date().toISOString(),
        };
        
        const existingSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        localStorage.setItem('contactSubmissions', JSON.stringify([...existingSubmissions, newSubmission]));

        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } catch (error) {
        console.error("Failed to save submission", error);
        setStatus('error');
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-black tracking-wider">Get In Touch</h1>
        <p className="text-gray-400 mt-4">Have a question or just want to say hi? Drop us a line.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-xl mx-auto mt-12 bg-gray-900 p-8 rounded-lg"
      >
        {status === 'success' ? (
          <div className="text-center py-10">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold text-green-400"
            >
              Thanks for reaching out!
            </motion.div>
            <p className="text-gray-400 mt-2">We'll get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} text-white rounded-md p-3 focus:ring-2 focus:ring-white focus:outline-none transition`}
                  required
                />
                 {errors.name && <p className="text-red-500 text-xs mt-1">Name is required.</p>}
              </div>
              <div className="md:col-span-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white rounded-md p-3 focus:ring-2 focus:ring-white focus:outline-none transition`}
                  required
                />
                 {errors.email && <p className="text-red-500 text-xs mt-1">Please enter a valid email.</p>}
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`w-full bg-gray-800 border ${errors.message ? 'border-red-500' : 'border-gray-700'} text-white rounded-md p-3 focus:ring-2 focus:ring-white focus:outline-none transition`}
                required
              ></textarea>
               {errors.message && <p className="text-red-500 text-xs mt-1">Message is required.</p>}
            </div>
            <div className="mt-8">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-white text-black font-bold py-3 px-8 uppercase tracking-wider hover:bg-gray-200 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </div>
             {status === 'error' && <p className="text-red-500 text-sm mt-4 text-center">Something went wrong. Please try again.</p>}
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ContactPage;
