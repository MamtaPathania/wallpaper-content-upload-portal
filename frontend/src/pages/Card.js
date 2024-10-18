

// import React, { useState } from 'react';
// import EditModal from './EditModal';
// import { MdDeleteForever } from 'react-icons/md';
// import { MdModeEditOutline } from 'react-icons/md';
// import { FaEye } from 'react-icons/fa';
// import { PiDownloadSimple } from 'react-icons/pi';

// const Card = ({ image, categories, onSave, onDelete }) => {
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isFullscreenVisible, setFullscreenVisible] = useState(false);

//   const handleEditClick = () => {
//     setModalVisible(true);
//   };

//   const handleSave = (updatedImage) => {
//     onSave(updatedImage);
//     setModalVisible(false); 
//   };

//   const handleImageClick = () => {
//     setFullscreenVisible(true);
//   };

//   const handleFullscreenClose = () => {
//     setFullscreenVisible(false);
//   };

//   const handleView = () => {
//     setFullscreenVisible(true);
//   };

//   return (
//     <div className="relative group mt-4 rounded-lg shadow-lg bg-white/35 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
//       <img
//         src={image.url}
//         alt={image.name}
//         className="rounded-lg md:w-[400px] md:h-[300px] lg:w-[300px] lg:h-[300px] w-[300px] h-[200px] cursor-pointer"
//         onClick={handleImageClick}
//       />
//       <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
//         <h2 className="text-lg font-semibold text-white mb-2">{image.name}</h2>
//         <p className="text-white mb-4">Category: {image.category}</p>
//         <div className="flex space-x-4">
//           <button
//             onClick={handleView}
//             className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-3xl"
//           >
//             <FaEye size={20} color="white" />
//           </button>
//           <button
//             onClick={handleEditClick}
//             className="flex items-center justify-center p-2 bg-green-500 text-white rounded-3xl"
//           >
//             <MdModeEditOutline size={20} color="white" />
//           </button>
//           <button
//             onClick={() => onDelete(image.id)}
//             className="flex items-center justify-center p-2 bg-red-500 text-white rounded-3xl"
//           >
//             <MdDeleteForever size={20} color="white" />
//           </button>
//         </div>
//       </div>

//       <button
//         className="absolute bottom-1 right-1 p-1 bg-black/70 text-white rounded-full z-10"
//       >
//         <PiDownloadSimple size={20} color="white" />
//       </button>

//       <EditModal
//         visible={isModalVisible}
//         onHide={() => setModalVisible(false)}
//         image={image}
//         categories={categories}
//         onSave={handleSave}
//       />

//       {isFullscreenVisible && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
//           <div className="relative">
//             <img
//               src={image.url}
//               alt={image.name}
//               className="max-w-full max-h-screen object-contain"
//             />
//             <button
//               onClick={handleFullscreenClose}
//               className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-50 rounded-full p-2"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Card;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditModal from './EditModal';
import { MdDeleteForever } from 'react-icons/md';
import { MdModeEditOutline } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { PiDownloadSimple } from 'react-icons/pi';
import { downloadedImageCount } from '../api/api';

const Card = ({ image, categories, onSave, onDelete, image_id }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFullscreenVisible, setFullscreenVisible] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    const fetchDownloadCount = async () => {
      try {
        const response = await axios.post(downloadedImageCount, { image_id });
        if (response.data.result.length > 0) {
          setDownloadCount(response.data.result[0].COUNT || 0);
        } else {
          setDownloadCount(0);
        }
      } catch (error) {
        console.error('Error fetching download count:', error);
        setDownloadCount(0); // Set to 0 in case of an error
      }
    };

    fetchDownloadCount();
  }, [image_id]);

  const handleEditClick = () => {
    setModalVisible(true);
  };

  const handleSave = (updatedImage) => {
    onSave(updatedImage);
    setModalVisible(false);
  };

  const handleImageClick = () => {
    setFullscreenVisible(true);
  };

  const handleFullscreenClose = () => {
    setFullscreenVisible(false);
  };

  const handleView = () => {
    setFullscreenVisible(true);
  };

  return (
    <div className="relative group mt-4 rounded-lg shadow-lg bg-white/35 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
      <img
        src={image.url}
        alt={image.name}
        className="rounded-lg md:w-[400px] md:h-[300px] lg:w-[300px] lg:h-[300px] w-[300px] h-[200px] cursor-pointer"
        onClick={handleImageClick}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold text-white mb-2">{image.name}</h2>
        <p className="text-white mb-4">Category: {image.category}</p>
        <div className="flex space-x-4">
          <button
            onClick={handleView}
            className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-3xl"
          >
            <FaEye size={20} color="white" />
          </button>
          <button
            onClick={handleEditClick}
            className="flex items-center justify-center p-2 bg-green-500 text-white rounded-3xl"
          >
            <MdModeEditOutline size={20} color="white" />
          </button>
          <button
            onClick={() => onDelete(image.id)}
            className="flex items-center justify-center p-2 bg-red-500 text-white rounded-3xl"
          >
            <MdDeleteForever size={20} color="white" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-1 right-1 p-1 bg-black/70 text-white rounded-full z-10 flex items-center justify-center">
        <PiDownloadSimple size={20} color="white" />
        <span className="absolute -top-2 -right-1 text-white text-xs rounded-full px-2 py-1">
          {downloadCount}
        </span>
      </div>

      <EditModal
        visible={isModalVisible}
        onHide={() => setModalVisible(false)}
        image={image}
        categories={categories}
        onSave={handleSave}
      />

      {isFullscreenVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="relative">
            <img
              src={image.url}
              alt={image.name}
              className="max-w-full max-h-screen object-contain"
            />
            <button
              onClick={handleFullscreenClose}
              className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-50 rounded-full p-2"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
