


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Card from '../pages/Card';
// import Layout from '../components/Layout';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ReactPaginate from 'react-paginate';
// import { AllImagesData, deleteDataById, fetchCategory } from '../api/api';
// import Loader from './Loader';

// function ShowCategory({ categories }) {
//   const [pageRange, setPageRange] = useState(window.innerWidth <= 768 ? 2 : 5);
//   const [currentPage, setCurrentPage] = useState(0);
//   const imagePerPage = 12;
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [imagesData, setImagesData] = useState([]);
//   const [showConfirmDelete, setShowConfirmDelete] = useState(false);
//   const [imageToDelete, setImageToDelete] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showPagination, setShowPagination] = useState(false);
//   const [noImagesFound, setNoImagesFound] = useState(false);
//   const [categoryCount, setCategoryCount] = useState(0);
//   const [cardsVisible, setCardsVisible] = useState(true); // State for toggling card visibility


//   // Fetch all images by default when the component mounts
//   useEffect(() => {
//     const fetchAllImages = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.post(AllImagesData);
//         setImagesData(response.data);
//         setNoImagesFound(response.data.length === 0);
//         setShowPagination(response.data.length > 0);
//         setCategoryCount(response.data.length); // Set count for 'All'
//       } catch (error) {
//         console.error('Error fetching images:', error);
//         toast.error('Error fetching images');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllImages();
//   }, []);

//   // Fetch images based on the selected category when submit is clicked
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const url = selectedCategory === 'All' ? AllImagesData : fetchCategory;
//       const response = await axios.post(url, {
//         category: selectedCategory !== 'All' ? selectedCategory : undefined
//       });
//       setImagesData(response.data);
//       setNoImagesFound(response.data.length === 0);
//       setShowPagination(response.data.length > 0);
//       setCategoryCount(response.data.length); // Update count based on category
//       setCurrentPage(0); // Reset to the first page when new data is fetched
//     } catch (error) {
//       console.error('Error fetching images:', error);
//       toast.error('Error fetching images');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePageClick = (data) => {
//     setCurrentPage(data.selected);
//   };

//   const indexOfLastImage = (currentPage + 1) * imagePerPage;
//   const indexOfFirstImage = currentPage * imagePerPage;
//   const currentImages = imagesData.slice(indexOfFirstImage, indexOfLastImage);

//   const handleDropdownToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setIsOpen(false);
//   };

//   const handleSave = (updatedImage) => {
//     setImagesData((prevImages) =>
//       prevImages.map((image) =>
//         image.id === updatedImage.id ? { ...image, ...updatedImage } : image
//       )
//     );
//     toast.success('Image updated successfully');
//   };

//   const handleDelete = (imageId) => {
//     setImageToDelete(imageId);
//     setShowConfirmDelete(true);
//   };

  
//   const confirmDelete = async () => {
//         setLoading(true);
//         try {
//           // Find the image object using the image ID
//           const imageToDeleteData = imagesData.find(image => image.id === imageToDelete);
//           console.log(imageToDeleteData,"-------------")
          
//           if (!imageToDeleteData) {
//             throw new Error('Image data not found');
//           }
          
//           const imageUrl = imageToDeleteData.url; 
//           const urlParts = imageUrl.split('.com/');
//           const path = urlParts[1]; 
       
//           // Construct the request body with the correct image URL field
//           const requestBody = {
//             id: imageToDelete,
//             image: path 
            
//           };
//           console.log(path,"===image")
//           console.log(imageToDelete,"====id====")
      
//           await axios.post(deleteDataById, requestBody);
          
//           // Remove the deleted image from the state
//           setImagesData((prevImages) => prevImages.filter((image) => image.id !== imageToDelete));
//           toast.success('Image deleted successfully');
//         } catch (error) {
//           console.error('Error deleting image:', error);
//           toast.error('Error deleting image: ' + (error.response ? error.response.data : error.message));
//         } finally {
//           setLoading(false);
//           setShowConfirmDelete(false);
//         }
//       };
    

//   const cancelDelete = () => {
//     setShowConfirmDelete(false);
//   };

//   return (
//     <Layout>
//       <ToastContainer />

//       <div className="flex justify-center mt-10">
//         <div className="lg:ml-64 w-[300px] lg:w-[400px] p-6 border border-gray-200 bg-white rounded-lg shadow-lg">
//           <form onSubmit={handleSubmit} className="text-center">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Select Category
//             </label>
//             <div className="dropdown mb-6">
//               <div
//                 className="dropdown-toggle p-3 bg-white border border-gray-200 rounded-lg cursor-pointer"
//                 onClick={handleDropdownToggle}
//               >
//                 {selectedCategory}
//               </div>
//               {isOpen && (
//                 <div className="dropdown-menu mt-2 p-3 bg-white border border-gray-200 rounded-lg">
//                   {categories.map((category) => (
//                     <div
//                       key={category}
//                       className={`dropdown-item p-2 cursor-pointer ${
//                         selectedCategory === category ? 'bg-blue-100' : 'hover:bg-gray-200'
//                       }`}
//                       onClick={() => handleCategorySelect(category)}
//                     >
//                       {category}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <button
//               type="submit"
//               className="p-button p-component p-button-primary p-3 bg-blue-500 text-white shadow-md hover:bg-blue-600"
//             >
//               Submit
//             </button>
//             {noImagesFound && (
//               <p className="mt-4 text-red-500">No Images found.</p>
//             )}
//             <p className="mt-4 text-gray-700">
//               <strong>{selectedCategory} Category Count: </strong>{categoryCount} image{categoryCount !== 1 ? 's' : ''}
//             </p>
//           </form>
//         </div>
//       </div>

//       <div className="mt-6 lg:ml-64">
//         {loading ? (
//           <div className="flex items-center justify-center w-full h-64">
//             <Loader />
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
//               {currentImages.map((image,index) => (
//                 <Card
//                   key={image.id || index}
//                   image={image}
//                   categories={categories}
//                   onSave={handleSave}
//                   onDelete={handleDelete}
//                 />
//               ))}
//             </div>

//             {showPagination && (
//               <ReactPaginate
//                 className="flex justify-center items-center gap-2 mb-6 mt-8"
//                 previousLabel={'Previous'}
//                 nextLabel={'Next'}
//                 breakLabel={'...'}
//                 breakClassName={'break-me'}
//                 pageCount={Math.ceil(imagesData.length / imagePerPage)}
//                 marginPagesDisplayed={2}
//                 pageRangeDisplayed={pageRange}
//                 onPageChange={handlePageClick}
//                 containerClassName={'flex justify-center list-none p-0'}
//                 pageClassName={'mx-1 border border-gray-300 p-2 cursor-pointer rounded'}
//                 activeClassName={'bg-blue-500 text-white'}
//                 previousClassName={'mx-1 border border-gray-300 bg-white p-2 cursor-pointer rounded'}
//                 nextClassName={'mx-1 border border-gray-300 p-2 bg-white cursor-pointer rounded'}
//               />
//             )}
//           </>
//         )}
//       </div>

//       {showConfirmDelete && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
//             <p>Are you sure you want to delete this image?</p>
//             <div className="flex justify-end space-x-2 mt-4">
//               <button
//                 onClick={confirmDelete}
//                 className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={cancelDelete}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// }

// export default ShowCategory;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../pages/Card';
import Layout from '../components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { AllImagesData, deleteDataById, fetchCategory } from '../api/api';
import Loader from './Loader';

function ShowCategory({ categories }) {
  const [pageRange, setPageRange] = useState(window.innerWidth <= 768 ? 2 : 5);
  const [currentPage, setCurrentPage] = useState(0);
  const imagePerPage = 12;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [imagesData, setImagesData] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPagination, setShowPagination] = useState(false);
  const [noImagesFound, setNoImagesFound] = useState(false);
  const [categoryCount, setCategoryCount] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(true);

  // Fetch all images by default when the component mounts
  useEffect(() => {
    const fetchAllImages = async () => {
      setLoading(true);
      try {
        const response = await axios.post(AllImagesData);
        setImagesData(response.data);
        setNoImagesFound(response.data.length === 0);
        setShowPagination(response.data.length > imagePerPage);
        setCategoryCount(response.data.length); // Set count for 'All'
      } catch (error) {
        console.error('Error fetching images:', error);
        toast.error('Error fetching images');
      } finally {
        setLoading(false);
      }
    };

    fetchAllImages();
  }, []);

  // Fetch images based on the selected category when submit is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = selectedCategory === 'All' ? AllImagesData : fetchCategory;
      const response = await axios.post(url, {
        category: selectedCategory !== 'All' ? selectedCategory : undefined
      });
      setImagesData(response.data);
      setNoImagesFound(response.data.length === 0);
      setShowPagination(response.data.length > imagePerPage); 
      setCategoryCount(response.data.length); 
      setCurrentPage(0); 
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Error fetching images');
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const indexOfLastImage = (currentPage + 1) * imagePerPage;
  const indexOfFirstImage = currentPage * imagePerPage;
  const currentImages = imagesData.slice(indexOfFirstImage, indexOfLastImage);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  const handleSave = (updatedImage) => {
    setImagesData((prevImages) =>
      prevImages.map((image) =>
        image.id === updatedImage.id ? { ...image, ...updatedImage } : image
      )
    );
    toast.success('Image updated successfully');
  };

  const handleDelete = (imageId) => {
    setImageToDelete(imageId);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      const imageToDeleteData = imagesData.find(image => image.id === imageToDelete);
      if (!imageToDeleteData) {
        throw new Error('Image data not found');
      }
      const imageUrl = imageToDeleteData.url;
      const urlParts = imageUrl.split('.com/');
      const path = urlParts[1];
      const requestBody = {
        id: imageToDelete,
        image: path
      };
      await axios.post(deleteDataById, requestBody);
      setImagesData((prevImages) => prevImages.filter((image) => image.id !== imageToDelete));
      toast.success('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Error deleting image: ' + (error.response ? error.response.data : error.message));
    } finally {
      setLoading(false);
      setShowConfirmDelete(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  const toggleCardsVisibility = () => {
    setCardsVisible(prev => !prev);
  };

  return (
    <Layout>
      <ToastContainer />

      <div className="flex justify-center mt-10">
        <div className="lg:ml-64 w-[300px] lg:w-[400px] p-6 border border-gray-200 bg-white rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="text-center">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Category
            </label>
            <div className="dropdown mb-6">
              <div
                className="dropdown-toggle p-3 bg-white border border-gray-200 rounded-lg cursor-pointer"
                onClick={handleDropdownToggle}
              >
                {selectedCategory}
              </div>
              {isOpen && (
                <div className="dropdown-menu mt-2 p-3 bg-white border border-gray-200 rounded-lg">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className={`dropdown-item p-2 cursor-pointer ${
                        selectedCategory === category ? 'bg-blue-100' : 'hover:bg-gray-200'
                      }`}
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button class="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
              type="submit"
            >
              Submit
            </button>
            {noImagesFound && (
              <p className="mt-4 text-red-500">No Images found.</p>
            )}
            <p className="mt-4 text-gray-700">
              <strong>{selectedCategory} Category Count: </strong>{categoryCount} image{categoryCount !== 1 ? 's' : ''}
            </p>
          </form>
        </div>
      </div>

      <div className="mt-6 lg:ml-64 ">
        <div className='flex justify-end items-center'>
        <button class="px-8 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
        onClick={toggleCardsVisibility}
        >
          {cardsVisible ? 'Hide' : 'Show'} 
        </button>
        </div>
       
        {loading ? (
          <div className="flex items-center justify-center w-full h-64">
            <Loader />
          </div>
        ) : (
          <>
            {cardsVisible && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                  {currentImages.map((image, index) => (
                    <Card
                      key={image.id || index}
                      image={image}
                      categories={categories}
                      onSave={handleSave}
                      onDelete={handleDelete}
                      image_id={image.id}
                    />
                  ))}
                </div>
                {showPagination && (
                  <ReactPaginate
                    className="flex justify-center items-center gap-2 mb-6 mt-8"
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(imagesData.length / imagePerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={pageRange}
                    onPageChange={handlePageClick}
                    containerClassName={'flex justify-center list-none p-0'}
                    pageClassName={'mx-1 border border-gray-300 p-2 cursor-pointer rounded'}
                    activeClassName={'bg-blue-500 text-white'}
                    previousClassName={'mx-1 border border-gray-300 bg-white p-2 cursor-pointer rounded'}
                    nextClassName={'mx-1 border border-gray-300 p-2 bg-white cursor-pointer rounded'}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>

      {showConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this image?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={confirmDelete}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default ShowCategory;
