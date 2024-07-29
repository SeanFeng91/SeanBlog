import React from 'react';
import { motion } from 'framer-motion';

const ExperienceCard = ({ experience }) => {
  return (
    <motion.div 
      className="border-l-2 border-blue-500 pl-4"
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold">{experience.position}</h3>
      <p className="text-blue-300">{experience.company}</p>
      <p className="text-gray-400">{experience.period}</p>
      <p className="mt-2 text-gray-300">{experience.description}</p>
    </motion.div>
  );
};

export default ExperienceCard;