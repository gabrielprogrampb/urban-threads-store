
import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, Category } from '../../types';
import { useProducts } from '../../context/ProductContext';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const initialFormState = {
  name: '',
  price: '',
  category: Category.Tshirts,
  imageUrl: '',
  description: '',
  isFeatured: false,
};

type ImageSourceType = 'upload' | 'url';

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState(initialFormState);
  const { addProduct, updateProduct } = useProducts();
  const [formError, setFormError] = useState('');
  const [imageSourceType, setImageSourceType] = useState<ImageSourceType>('upload');

  useEffect(() => {
    if (isOpen) {
        if (product) {
          setFormData({
            name: product.name,
            price: String(product.price),
            category: product.category,
            imageUrl: product.imageUrl,
            description: product.description,
            isFeatured: product.isFeatured,
          });
          // Set image source type based on existing URL format
          if (product.imageUrl && !product.imageUrl.startsWith('data:image')) {
            setImageSourceType('url');
          } else {
            setImageSourceType('upload');
          }
        } else {
          setFormData(initialFormState);
          setImageSourceType('upload');
        }
        setFormError('');
    }
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSourceTypeChange = (type: ImageSourceType) => {
    setImageSourceType(type);
    setFormData(prev => ({ ...prev, imageUrl: '' })); // Clear image URL on source change
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.imageUrl) {
      setFormError('Please provide a product image by uploading or entering a URL.');
      return;
    }

    const productData = {
        ...formData,
        price: parseFloat(formData.price)
    };

    if(product) { // Editing existing product
        updateProduct({ ...product, ...productData });
    } else { // Adding new product
        addProduct(productData);
    }
    onClose();
  }

  const tabButtonClasses = (isActive: boolean) => 
    `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive ? 'bg-white text-black' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    }`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">{product ? 'Edit Product' : 'Add New Product'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="overflow-y-auto px-8 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="w-full bg-gray-800 p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Price</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full bg-gray-800 p-2 rounded" required step="0.01" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-gray-800 p-2 rounded">
                        <option value={Category.Tshirts}>{Category.Tshirts}</option>
                        <option value={Category.Caps}>{Category.Caps}</option>
                    </select>
                </div>
                 <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Product Image</label>
                    <div className="flex gap-2 mb-2">
                        <button type="button" onClick={() => handleSourceTypeChange('upload')} className={tabButtonClasses(imageSourceType === 'upload')}>Upload File</button>
                        <button type="button" onClick={() => handleSourceTypeChange('url')} className={tabButtonClasses(imageSourceType === 'url')}>Use URL</button>
                    </div>
                    <div className="mt-1 flex items-center gap-4 p-2 rounded-md border-2 border-dashed border-gray-700">
                        {formData.imageUrl ? (
                             <img src={formData.imageUrl} alt="Preview" className="w-16 h-16 object-cover rounded" />
                        ) : (
                            <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                        )}
                        <div className="flex-grow">
                            {imageSourceType === 'upload' ? (
                                <input type="file" name="imageUrl" id="imageUrl" onChange={handleFileChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600 cursor-pointer" />
                            ) : (
                                <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.png" className="w-full bg-gray-800 p-2 rounded" />
                            )}
                        </div>
                    </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full bg-gray-800 p-2 rounded" rows={4} required></textarea>
              </div>
              <div className="flex items-center mt-4">
                  <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="h-4 w-4 rounded accent-white" />
                  <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-300">Featured Product</label>
              </div>
              {formError && <p className="text-red-500 text-sm mt-4">{formError}</p>}
              <div className="flex justify-end gap-4 mt-8">
                <button type="button" onClick={onClose} className="py-2 px-4 text-gray-300 hover:bg-gray-800 rounded-md">Cancel</button>
                <button type="submit" className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200">Save Product</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
