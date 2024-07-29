import React from 'react';
import { motion } from 'framer-motion';

const ExperienceCard = ({ company, position, period, description }) => (
  <motion.div 
    className="mb-8 border-l-2 border-blue-500 pl-4"
    initial={{ x: -50, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-xl font-semibold">{position}</h3>
    <p className="text-blue-300">{company}</p>
    <p className="text-gray-400">{period}</p>
    <p className="mt-2 text-gray-300">{description}</p>
  </motion.div>
);

const ExperienceSection = () => {
  const experiences = [
    {
      company: 'TechGiant Inc.',
      position: '高级UI/UX设计师',
      period: '2020 - 至今',
      description: '负责公司核心产品的用户界面设计和用户体验优化'
    },
    {
      company: 'CreativeSolutions Co.',
      position: 'UI设计师',
      period: '2018 - 2020',
      description: '参与多个客户项目,提供创新的设计解决方案'
    },
  ];

  return (
    <div>
      {experiences.map((exp, index) => (
        <ExperienceCard key={index} {...exp} />
      ))}
    </div>
  );
};

export default ExperienceSection;