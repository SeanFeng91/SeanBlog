import React, { useState } from 'react';

const ImageSwitcher = ({ images, maxHeight = 1000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div 
        style={{ maxHeight: `${maxHeight}px` }}
        className="w-full mb-4 relative overflow-hidden"
      >
        <div style={{ paddingTop: '56.25%' }} className="relative w-full">
          <img 
            src={images[currentIndex]} 
            alt={`Image ${currentIndex + 1}`} 
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <button 
          onClick={prevImage} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          上一张
        </button>
        <button 
          onClick={nextImage} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          下一张
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        {currentIndex + 1} / {images.length}
      </p>
    </div>
  );
};

export default ImageSwitcher;