
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const linkClasses = "flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors rounded-md";
  const activeLinkClasses = "bg-gray-800 text-white font-bold";

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 py-8">
          <aside className="md:w-64 flex-shrink-0">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4">Admin Menu</h2>
              <nav className="space-y-2">
                <NavLink 
                  to="/admin/dashboard" 
                  className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                >
                  Dashboard
                </NavLink>
                <NavLink 
                  to="/admin/products" 
                  className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                >
                  Products
                </NavLink>
                <NavLink 
                  to="/admin/messages" 
                  className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                >
                  Messages
                </NavLink>
              </nav>
            </div>
          </aside>
          <main className="flex-grow">
            <div className="bg-gray-900 p-8 rounded-lg min-h-[60vh]">
                <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
