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

export const Alert = ({ type = 'info', title, children }) => {
  const bgColors = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
  };

  return (
    <div className={`border-l-4 p-4 mb-4 ${bgColors[type]}`}>
      {title && <h4 className="font-bold mb-2">{title}</h4>}
      <div>{children}</div>
    </div>
  );
};


export const CodeBlock = ({ language, children }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mb-4 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center bg-gray-800 px-4 py-2 text-white">
        <span className="text-sm font-mono">{language}</span>
        <button
          onClick={copyToClipboard}
          className="text-sm hover:bg-gray-700 px-2 py-1 rounded"
        >
          {copied ? '已复制!' : '复制代码'}
        </button>
      </div>
      <pre className="bg-gray-900 p-4 overflow-x-auto">
        <code className="text-white text-sm font-mono">{children}</code>
      </pre>
    </div>
  );
};
// 代码块
export const MDXCodeBlock = ({ language, children }) => (
  <CodeBlock language={language}>
    <Fragment>{children}</Fragment>
  </CodeBlock>
);

// 行内高亮
export const InlineCode = ({ children }) => {
  return (
    <code className="px-1 py-0.5 rounded bg-gray-200 text-red-600 font-mono text-sm">
      {children}
    </code>
  );
};