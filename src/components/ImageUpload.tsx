import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (image: { id: string; url: string }) => void;
  onCancel: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, onCancel }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImage = {
        id: Date.now().toString(),
        url: reader.result as string,
      };
      onUpload(newImage);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Upload Image</h2>
      <div
        className={`border-2 border-dashed rounded-md p-8 text-center ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="image-upload"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload size={48} className="text-gray-400 mb-4" />
          <p className="text-lg mb-2 text-gray-700">Drag and drop your image here</p>
          <p className="text-sm text-gray-500">or click to select a file</p>
        </label>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onCancel}
          className="mr-4 px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-200"
        >
          Cancel
        </button>
        <label
          htmlFor="image-upload"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer transition duration-200"
        >
          Select File
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;