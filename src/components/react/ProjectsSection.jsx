import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, image }) => (
  <motion.div 
    className="bg-white bg-opacity-10 rounded-lg overflow-hidden"
    whileHover={{ scale: 1.05 }}
  >
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const projects = [
    {
      title: '全球电商平台重设计',
      description: '优化用户体验,提升转化率30%',
      image: '/path-to-project-image-1.jpg'
    },
    {
      title: '智能家居控制应用',
      description: '简化复杂功能,用户满意度提升50%',
      image: '/path-to-project-image-2.jpg'
    },
    {
      title: '企业数据可视化仪表板',
      description: '帮助决策者快速洞察业务趋势',
      image: '/path-to-project-image-3.jpg'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  );
};

export default ProjectsSection;