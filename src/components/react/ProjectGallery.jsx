import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 新增的 SVG 图标组件
const SvgIcon = ({ children, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" className={className}>
    {children}
  </svg>
);

const ProjectGallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const blogProjects = [
    { id: 1, title: "有用/常用的链接集合", subtitle: "工具类博客文章 #1", description: "会罗列一些常用的链接地址,可以快速找到一些有用的信息并在这里记录", tags: ["Tools", "MDX", "Links"], icon: 'mdi:tools' },
    { id: 2, title: "关于md类文件标题anchor的探索", subtitle: "工具类博客文章 #2", description: "探讨Markdown文件中标题锚点的使用和实现", tags: ["CSS", "MDX"], icon: 'mdi:code-tags' },
    { id: 3, title: "新生产环境配置记录", subtitle: "工具类博客文章 #3", description: "之前只是在mac上安装了python,最近使用了其他很多的语言,希望系统性记录一下安装的内容和部署...", tags: ["CSS", "MDX", "Github"], icon: 'mdi:server' },
  ];

  const artProjects = [
    { id: 4, title: "现代雕塑设计", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", category: "雕塑" },
    { id: 5, title: "城市建筑概念", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", category: "建筑" },
    { id: 6, title: "抽象艺术装置", image: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", category: "装置艺术" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === artProjects.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === artProjects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? artProjects.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold mb-6">博客文章</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {blogProjects.map((project) => (
            <motion.div 
              key={project.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">{project.subtitle}</p>
                    <a 
                      href={`/project/${project.id}`}
                      className="block text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300"
                    >
                      {project.title}
                    </a>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">艺术设计</h2>
        <div className="relative h-96 overflow-hidden rounded-lg shadow-lg">
          <AnimatePresence initial={false}>
            <motion.img 
              key={currentImageIndex}
              src={artProjects[currentImageIndex].image} 
              alt={artProjects[currentImageIndex].title} 
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <a 
                href={`/art-project/${artProjects[currentImageIndex].id}`}
                className="block"
              >
                <h3 className="text-white text-2xl font-bold mb-2 hover:text-blue-300 transition-colors duration-300">{artProjects[currentImageIndex].title}</h3>
              </a>
              <p className="text-gray-300">{artProjects[currentImageIndex].category}</p>
            </div>
          </div>
          <div className="absolute top-4 left-4 bg-white bg-opacity-75 px-3 py-1 rounded-full text-sm font-semibold">
            {currentImageIndex + 1} / {artProjects.length}
          </div>
          <button 
            onClick={prevImage} 
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-all duration-300 focus:outline-none"
          >
            <SvgIcon className="text-gray-800">
              <path fill="currentColor" d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z"/>
            </SvgIcon>
          </button>
          <button 
            onClick={nextImage} 
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-all duration-300 focus:outline-none"
          >
            <SvgIcon className="text-gray-800">
              <path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"/>
            </SvgIcon>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProjectGallery;