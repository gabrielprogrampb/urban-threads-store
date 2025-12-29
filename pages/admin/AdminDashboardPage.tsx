
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../../context/ProductContext';
import { ContactSubmission } from '../../types';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ title: string; value: string | number; linkTo: string; }> = ({ title, value, linkTo }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-lg"
    >
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-white my-2">{value}</p>
        <Link to={linkTo} className="text-sm text-white hover:underline">View All &rarr;</Link>
    </motion.div>
);

const AdminDashboardPage: React.FC = () => {
  const { products, isLoading } = useProducts();
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    try {
      const storedSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      setSubmissionCount(storedSubmissions.length);
    } catch (error) {
      console.error("Failed to load submissions from localStorage", error);
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-black tracking-wider text-white mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Products" value={isLoading ? '...' : products.length} linkTo="/admin/products" />
        <StatCard title="Contact Messages" value={submissionCount} linkTo="/admin/messages" />
        {/* Placeholder for more stats */}
        <StatCard title="Total Users" value="2" linkTo="#" />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
