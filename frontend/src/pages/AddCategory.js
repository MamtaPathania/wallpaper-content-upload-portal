import Layout from '../components/Layout';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCategory({ categories, setCategories }) {
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = async () => {
    if (newCategory) {
      setLoading(true);
      try {
        // Simulate a network request or perform an actual request if needed
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay

        setCategories([...categories, newCategory]);
        setNewCategory('');
        toast.success('Category added successfully');
        setTimeout(() => {
          navigate("/"); 
        }, 1000);
      } catch (error) {
        console.error('Error adding category:', error);
        toast.error('Failed to add category'); 
        setTimeout(() => {
          setLoading(false);
        }, 1000); 
      }
    } else {
      toast.warn('Please enter a category name'); 
    }
  };

  return (
    <Layout>
              <ToastContainer />
   <div className="lg:ml-64 flex justify-center mt-10">

      <div className="w-[320px] lg:w-[400px] mx-auto mt-10 p-6 border border-gray-200 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">New Category</label>
          <input
            type="text"
            value={newCategory}
            onChange={onNewCategoryChange}
            placeholder="Enter new category"
            className="mt-1 block w-full py-2 px-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <div className='flex justify-center items-center'>
            <button
              type="button"
              onClick={handleAddCategory}
              className={`mt-2 py-2 px-4 rounded-lg focus:ring-4 ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600'} text-white flex items-center justify-center`}
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
              ) : (
                'Add Category'
              )}
            </button>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}

export default AddCategory;
