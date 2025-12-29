
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AccountPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-wider">My Account</h1>
          <p className="text-gray-400 mt-2">Welcome back, {user.name || user.email}!</p>
        </div>

        <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
          <div className="border-b border-gray-700 pb-4 mb-6">
            <h2 className="text-2xl font-bold text-white">Profile Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg text-gray-200">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg text-gray-200">{user.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-lg text-gray-200 capitalize">{user.role}</p>
            </div>
          </div>
          
          <div className="mt-8">
             <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white font-bold py-3 px-8 uppercase tracking-wider hover:bg-red-700 transition-colors duration-300"
              >
                Logout
              </button>
          </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Order History</h2>
            <div className="text-center text-gray-500 py-8">
                <p>You have no previous orders.</p>
            </div>
        </div>

      </motion.div>
    </div>
  );
};

export default AccountPage;
