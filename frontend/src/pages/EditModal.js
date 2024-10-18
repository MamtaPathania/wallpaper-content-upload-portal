import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import uploadImg from '../assets/images/logoo.png'; // Ensure the path is correct
import { updateData } from '../api/api';

const EditModal = ({ visible, onHide, image, categories, onSave }) => {
  const [editImageName, setEditImageName] = useState(image.name);
  const [editImageCategory, setEditImageCategory] = useState(image.category);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSave = () => {
    setShowConfirmation(true);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('id', image.id);
      formData.append('name', editImageName);
      formData.append('category', editImageCategory);
      if (selectedImage) {
        formData.append('file', selectedImage);
      }

      const response = await axios.post(updateData, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Changes done successfully:", response.data);

      onSave({
        id: image.id,
        name: editImageName,
        category: editImageCategory,
        url: selectedImage ? URL.createObjectURL(selectedImage) : image.url,
      });
      setShowConfirmation(false);
      onHide(); // Close the modal after saving
    } catch (error) {
      console.error("Error updating:", error.response ? error.response.data : error.message);
    }
  };

  const handleCancelUpdate = () => {
    setShowConfirmation(false);
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: 'image/*',
  });

  return (
    <div>
      <Dialog
        header="Edit Image"
        visible={visible}
        className="w-[380px] md:w-[700px] lg:w-[700px] lg:mt-10"
        onHide={onHide}
      >
        <div className="p-fluid">
          <div className="field mb-4">
            <label htmlFor="imageUpload" className="block text-gray-700 font-semibold mb-2">Upload New Image</label>
            <div
              {...getRootProps({ className: 'border border-gray-300 rounded-lg p-4 w-full cursor-pointer' })}
              className="dropzone border border-gray-200 rounded-lg py-2 flex justify-center items-center"
            >
              <input {...getInputProps()} id="imageUpload" />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-[100px] h-[100px] mb-4 rounded-lg" />
              ) : (
                <div className="flex flex-col items-center">
                  <img src={uploadImg} alt="Upload Image" className="w-[40px] h-[40px]" />
                  <p className="text-center text-gray-600">Drag & drop an image here, or click to select one</p>
                </div>
              )}
            </div>
          </div>
          <div className="field mb-4">
            <label htmlFor="imageName" className="block text-gray-700 font-semibold mb-2">Image Name</label>
            <InputText
              id="imageName"
              value={editImageName}
              onChange={(e) => setEditImageName(e.target.value)}
              placeholder="Enter new image name"
              className="p-inputtext p-component border border-gray-300 rounded-lg p-2 shadow-sm w-full"
            />
          </div>
          <div className="field mb-4">
            <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category</label>
            <Dropdown
              id="category"
              value={editImageCategory}
              options={categories}
              onChange={(e) => setEditImageCategory(e.value)}
              placeholder="Select a category"
              className="p-dropdown w-full border border-gray-300"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              label="Save"
              onClick={handleSave}
              className="p-button p-button-success p-2 bg-green-500 text-white shadow-md hover:bg-green-600"
            />
            <Button
              label="Cancel"
              onClick={onHide}
              className="p-button p-button-secondary p-2 bg-red-500 text-white shadow-md hover:bg-red-600"
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Confirm Update"
        visible={showConfirmation}
        modal
        onHide={handleCancelUpdate}
      >
        <p>Do you want to update the image details?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            label="Update"
            onClick={handleUpdate}
            className="p-button p-button-success p-2 bg-green-500 text-white shadow-md hover:bg-green-600"
          />
          <Button
            label="Cancel"
            onClick={handleCancelUpdate}
            className="p-button p-button-secondary p-2 bg-red-500 text-white shadow-md hover:bg-red-600"
          />
        </div>
      </Dialog>
    </div>
  );
};

export default EditModal;
