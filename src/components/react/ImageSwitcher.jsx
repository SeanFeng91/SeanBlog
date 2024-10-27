import React, { useState } from 'react';

// ImageSwitcher组件：用于在多张图片之间切换显示
// props:
//   images: 图片URL数组
//   maxHeight: 图片容器的最大高度，默认为3000px
const ImageSwitcher = ({ images, maxHeight = 3000 }) => {
  // 使用useState钩子来管理当前显示的图片索引
  const [currentIndex, setCurrentIndex] = useState(0);

  // 切换到下一张图片
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // 切换到上一张图片
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* 图片容器 */}
      <div 
        style={{ maxHeight: `${maxHeight}px` }}
        className="w-full mb-4 relative overflow-hidden"
      >
        {/* 移除固定宽高比，使用 object-contain 来适应不同尺寸的图片 */}
        <div className="relative w-full h-full" style={{ minHeight: '600px' }}>
          <img 
            src={images[currentIndex]} 
            alt={`图片 ${currentIndex + 1}`} 
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        </div>
      </div>
      {/* 控制按钮 */}
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
      {/* 图片计数器 */}
      <p className="mt-2 text-sm text-gray-600">
        {currentIndex + 1} / {images.length}
      </p>
    </div>
  );
};

export default ImageSwitcher;