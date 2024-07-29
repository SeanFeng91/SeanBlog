import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-gray-400">{project.description}</p>
    </motion.div>
  );
};

export default ProjectCard;