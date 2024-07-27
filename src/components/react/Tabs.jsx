import React, { useState, useEffect } from 'react';

export const Tabs = ({ items }) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    console.log('Tabs component mounted, number of items:', items.length);
  }, [items.length]);

  const handleTabClick = (index) => {
    console.log('Tab clicked:', index);
    setActiveTab(index);
  };

  if (items.length === 0) {
    console.warn('No tab items provided to Tabs component');
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex border-b border-gray-200">
        {items.map((item, index) => (
          <button
            key={index}
            className={`py-2 px-4 font-medium text-sm transition-colors duration-200 ${
              activeTab === index
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabClick(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        <div dangerouslySetInnerHTML={{ __html: items[activeTab].content }} />
      </div>
    </div>
  );
};