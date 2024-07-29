import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TimelineItem = ({ experience, index, isLast }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } },
  };

  return (
    <motion.li
      ref={ref}
      className={`flex gap-x-4 ${isLast ? '' : 'pb-8 md:pb-12'}`}
      variants={itemVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700">
        <div className="relative z-10 w-7 h-7 flex justify-center items-center">
          <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
        </div>
      </div>
      <div className="grow pt-0.5 pb-8">
        <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
          {experience.title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{experience.company}</p>
        <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-gray-200">{experience.period}</p>
        <p className="mt-3 text-gray-600 dark:text-gray-400">{experience.description}</p>
      </div>
    </motion.li>
  );
};

const Timeline = () => {
  const experiences = [
    {
      title: "高级全栈开发工程师 | Senior Full Stack Developer",
      company: "科技创新有限公司 | Tech Innovation Co., Ltd.",
      period: "2020 - 至今 | Present",
      description: "负责公司核心产品的前端和后端开发，优化系统性能，提高用户体验。",
    },
    {
      title: "Web开发工程师 | Web Developer",
      company: "互联网科技有限公司 | Internet Technology Co., Ltd.",
      period: "2017 - 2020",
      description: "参与多个大型Web应用的开发和维护，实现响应式设计，确保跨平台兼容性。",
    },
  ];

  return (
    <ul className="relative space-y-2 mt-5">
      {experiences.map((exp, index) => (
        <TimelineItem key={index} experience={exp} index={index} isLast={index === experiences.length - 1} />
      ))}
    </ul>
  );
};

export default Timeline;