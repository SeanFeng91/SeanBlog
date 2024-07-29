import React from 'react';

const SkillsSection = () => {
  const skills = [
    { category: "前端开发 | Frontend", items: ["React", "Vue.js", "TypeScript", "Tailwind CSS"] },
    { category: "后端开发 | Backend", items: ["Node.js", "Python", "Django", "Express.js"] },
    { category: "数据库 | Databases", items: ["MongoDB", "PostgreSQL", "Redis"] },
    { category: "开发工具 | Dev Tools", items: ["Git", "Docker", "Webpack", "Jest"] },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {skills.map((skill, index) => (
        <div key={index}>
          <h3 className="text-lg font-semibold mb-2">{skill.category}</h3>
          <div className="flex flex-wrap gap-2">
            {skill.items.map((item, i) => (
              <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;