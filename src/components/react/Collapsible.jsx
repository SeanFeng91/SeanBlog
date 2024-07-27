import React, { useState } from 'react';

export const Collapsible = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border rounded-md mb-4">
      <button
        className="w-full text-left p-2 font-bold bg-gray-100 hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title} {isOpen ? '▲' : '▼'}
      </button>
      {isOpen && <div className="p-2">{children}</div>}
    </div>
  );
};
