// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout';
// import { useDropzone } from 'react-dropzone';
// import { ImageUpload } from '../api/api';
// import uploadLogo from '../assets/images/logoo.png'

// function DashboardHome({ categories }) { 
//   const [file, setFile] = useState(null);
//   const [name, setName] = useState('');
//   const [category, setCategory] = useState('Popular');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [imagePreview, setImagePreview] = useState('');

//   const navigate = useNavigate();
//   const username = Cookies.get('username');

//   const checkuser = () => {
//     if (!username || username === null || username === undefined) {
//       navigate('/login');
//     }
//   };

//   useEffect(() => {
//     checkuser();
//   }, []);

//   const onNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const onCategoryChange = (e) => {
//     setCategory(e.target.value);
//   };

//   const onDrop = (acceptedFiles) => {
//     if (acceptedFiles.length > 0) {
//       const file = acceptedFiles[0];
//       setFile(file);

//       // Generate image preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: 'image/*',
//     maxFiles: 1,
//   });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append('image', file);
//     formData.append('name', name);
//     formData.append('category', category);

//     try {
//       const response = await axios.post(ImageUpload, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage(response.data.message);
//       toast.success('Uploaded successfully');
//       setFile(null);
//     setImagePreview('');
//     } catch (error) {
//       setMessage('Error uploading image');
//       toast.error('Error uploading image');
//     } finally {
//       setLoading(false);
//       setName('');

//     }
//     // Remove this line to keep the previously selected category
//     // setCategory('Popular');
//     setName('');
//   };

//   return (
//     <Layout>
//       <ToastContainer />
//       <div className="flex justify-center lg:ml-64">

//       <div className="w-[320px] lg:w-[400px] mx-auto mt-4 p-6 border border-gray-200 bg-white rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
//         <form onSubmit={onSubmit} className="space-y-4">
//           <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-4 rounded-lg cursor-pointer">
//             <input {...getInputProps()} />
//             {isDragActive ? (
//               <p className="text-center text-gray-600">Drop the files here ...</p>
//             ) : (
//               <div className="flex flex-col items-center mx-2 overflow-hidden">
//               <img src={uploadLogo} alt="upload" className='h-[60px]' />
//               <p className="text-center text-gray-600 mt-2">
//                 {file ? `Selected file: ${file.name}` : 'Drag and drop an image here, or click to select one'}
//               </p>
//             </div>
//             )}
//           </div>
          
//           {imagePreview && (
//             <div className="mt-4 flex justify-center items-center">
//               <img src={imagePreview} alt="Preview" className="w-[400px] h-[160px]" />
//             </div>
//           )}
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={onNameChange}
//               placeholder="Enter Image Title"
//               className="mt-1 block w-full py-2 px-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Category</label>
//             <select onChange={onCategoryChange} value={category}
//              className="mt-1 block w-full py-2 px-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             >
//             {categories.map((category, index) => (
//            <option key={index} value={category} className='lg:mt-8'>
//             {category}
//            </option>
//            ))}
//           </select>
//           </div>
          
//         <div className='flex justify-center items-center'>
//         <button
//             type="submit"
//             className="w-[180px] bg-indigo-600 text-white py-2 px-4 rounded-lg focus:ring-4 focus:ring-indigo-300"
//             disabled={loading}
//           >
//             {loading ? 'Uploading...' : 'Upload'}
//           </button>
//         </div>
        
//         </form>
//         {message && (
//           <div className="mt-4 text-sm flex justify-center items-center">
//             <p className='text-green-600'>{message}</p>
//           </div>
//         )}
//       </div>
//       </div>
//     </Layout>
//   );
// }

// export default DashboardHome;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ImageUpload } from '../api/api';
import uploadLogo from '../assets/images/logoo.png'
import { useDropzone } from 'react-dropzone';

function DashboardHome({ categories }) { 
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Popular');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const navigate = useNavigate();
  const username = Cookies.get('username');

  const checkuser = () => {
    if (!username || username === null || username === undefined) {
      navigate('/login');
    }
  };

  useEffect(() => {
    checkuser();
  }, []);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      
      setFile(file);

      // Generate image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // accept: 'image/*',
    maxFiles: 1,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file); // Updated to match backend configuration
    formData.append('name', name);
    formData.append('category', category);

    try {
      const response = await axios.post(ImageUpload, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      toast.success('Uploaded successfully');
      setFile(null);
      setImagePreview('');
    } catch (error) {
      setMessage('Error uploading image');
      toast.error('Error uploading image');
    } finally {
      setLoading(false);
      setName('');
      
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="flex justify-center lg:ml-64">
        <div className="w-[320px] lg:w-[400px] mx-auto mt-4 p-6 border border-gray-200 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-4 rounded-lg cursor-pointer">
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-center text-gray-600">Drop the files here ...</p>
              ) : (
                <div className="flex flex-col items-center mx-2 overflow-hidden">
                  <img src={uploadLogo} alt="upload" className='h-[60px]' />
                  <p className="text-center text-gray-600 mt-2">
                    {file ? `Selected file: ${file.name}` : 'Drag and drop an image here, or click to select one'}
                  </p>
                </div>
              )}
            </div>
            
            {imagePreview && (
              <div className="mt-4 flex justify-center items-center">
                <img src={imagePreview} alt="Preview" className="w-[400px] h-[160px]" />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={onNameChange}
                placeholder="Enter Image Title"
                className="mt-1 block w-full py-2 px-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select onChange={onCategoryChange} value={category}
               className="mt-1 block w-full py-2 px-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
              {categories.map((category, index) => (
                <option key={index} value={category} className='lg:mt-8'>
                  {category}
                </option>
              ))}
            </select>
            </div>
            
          <div className='flex justify-center items-center'>
          <button
              type="submit"
              className="w-[180px] bg-indigo-600 text-white py-2 px-4 rounded-lg focus:ring-4 focus:ring-indigo-300"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          
          </form>
          {message && (
            <div className="mt-4 text-sm flex justify-center items-center">
              <p className='text-green-600'>{message}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default DashboardHome;

