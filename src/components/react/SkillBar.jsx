import React from 'react';
import { motion } from 'framer-motion';

const SkillBar = ({ skill }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-blue-300">{skill.name}</span>
        <span className="text-sm font-medium text-blue-300">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <motion.div 
          className="bg-blue-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </div>
  );
};

export default SkillBar;