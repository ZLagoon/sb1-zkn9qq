import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Image {
  id: string;
  url: string;
}

interface ImageGalleryProps {
  images: Image[];
  isSelectionMode: boolean;
  selectedImages: string[];
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  isSelectionMode,
  selectedImages,
  setSelectedImages,
}) => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const toggleImageSelection = (id: string) => {
    setSelectedImages(prev =>
      prev.includes(id) ? prev.filter(imgId => imgId !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`relative cursor-pointer overflow-hidden rounded-md shadow-sm transition-all duration-300 ${
              index === currentIndex ? 'scale-105 z-10' : ''
            } ${isSelectionMode && selectedImages.includes(image.id) ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => isSelectionMode ? toggleImageSelection(image.id) : setSelectedImage(image)}
          >
            <img src={image.url} alt="" className="w-full h-64 object-cover" />
            {isSelectionMode && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-sm flex items-center justify-center border border-gray-300">
                {selectedImages.includes(image.id) && (
                  <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="max-w-4xl max-h-full p-4 bg-white rounded-lg shadow-xl">
            <img src={selectedImage.url} alt="" className="max-w-full max-h-[80vh] object-contain" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition duration-200"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;