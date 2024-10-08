import React, { useState } from 'react';
import ImageGallery from './components/ImageGallery';
import ImageUpload from './components/ImageUpload';
import { PlusCircle, Trash2 } from 'lucide-react';

interface Image {
  id: string;
  url: string;
}

const defaultImages: Image[] = [
  { id: 'default-1', url: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg' },
  { id: 'default-2', url: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg' },
  { id: 'default-3', url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg' },
  { id: 'default-4', url: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg' },
  { id: 'default-5', url: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg' },
  { id: 'default-6', url: 'https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg' },
];

function App() {
  const [images, setImages] = useState<Image[]>(defaultImages);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const handleImageUpload = (newImage: Image) => {
    setImages(prevImages => [...prevImages, newImage]);
    setShowUpload(false);
  };

  const handleDeleteSelected = () => {
    setImages(prevImages => prevImages.filter(img => !selectedImages.includes(img.id)));
    setSelectedImages([]);
    setIsSelectionMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Image Gallery</h1>
          <div className="space-x-4">
            <button
              onClick={() => setShowUpload(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition duration-200"
            >
              <PlusCircle className="mr-2" size={20} />
              Add Image
            </button>
            <button
              onClick={() => setIsSelectionMode(!isSelectionMode)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center transition duration-200"
            >
              <Trash2 className="mr-2" size={20} />
              {isSelectionMode ? 'Cancel' : 'Delete Images'}
            </button>
          </div>
        </header>

        {showUpload ? (
          <ImageUpload onUpload={handleImageUpload} onCancel={() => setShowUpload(false)} />
        ) : (
          <ImageGallery
            images={images}
            isSelectionMode={isSelectionMode}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
        )}

        {isSelectionMode && selectedImages.length > 0 && (
          <div className="fixed bottom-8 right-8">
            <button
              onClick={handleDeleteSelected}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md flex items-center transition duration-200"
            >
              <Trash2 className="mr-2" size={20} />
              Delete Selected ({selectedImages.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;