
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ContactSubmission } from '../../types';

const AdminMessagesPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    try {
      const storedSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      // Sort by most recent first
      storedSubmissions.sort((a: ContactSubmission, b: ContactSubmission) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setSubmissions(storedSubmissions);
    } catch (error) {
      console.error("Failed to load submissions from localStorage", error);
      setSubmissions([]);
    }
  }, []);
  
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
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-wider text-white">Contact Messages</h1>
        <p className="text-gray-400 mt-1">Messages from the contact form.</p>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <p>No messages yet.</p>
        </div>
      ) : (
        <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          {submissions.map((sub) => (
            <motion.div 
                key={sub.id} 
                className="bg-gray-800 p-6 rounded-lg shadow-lg"
                variants={itemVariants}
            >
              <div className="border-b border-gray-700 pb-4 mb-4">
                <h3 className="font-bold text-lg text-white">{sub.name}</h3>
                <a href={`mailto:${sub.email}`} className="text-sm text-gray-400 hover:text-white transition-colors">{sub.email}</a>
              </div>
              <p className="text-gray-300 mb-4 whitespace-pre-wrap">{sub.message}</p>
              <p className="text-xs text-gray-500 text-right">
                {new Date(sub.timestamp).toLocaleString()}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AdminMessagesPage;
