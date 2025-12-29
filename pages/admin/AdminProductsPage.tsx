
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../../context/ProductContext';
import { Product, Category } from '../../types';
import ProductModal from '../../components/admin/ProductModal';

const AdminProductsPage: React.FC = () => {
  const { products, deleteProduct, isLoading } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };
  
  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
        deleteProduct(productId);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black tracking-wider text-white">Manage Products</h1>
        <button
          onClick={handleAddNew}
          className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200 transition-colors"
        >
          Add New Product
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <motion.tr
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-b border-gray-700 hover:bg-gray-700/50"
              >
                <td className="p-4">
                  <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                </td>
                <td className="p-4 font-semibold">{product.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">${product.price.toFixed(2)}</td>
                <td className="p-4">{product.isFeatured ? 'Yes' : 'No'}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(product)} className="text-sm text-blue-400 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="text-sm text-red-400 hover:underline">Delete</button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p className="p-4 text-center text-gray-500">No products found.</p>}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={editingProduct}
      />
    </div>
  );
};

export default AdminProductsPage;
