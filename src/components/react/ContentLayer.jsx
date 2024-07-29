import React from 'react';
import ProfileSection from './ProfileSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';

const ContentLayer = () => {
  return (
    <>
      <ProfileSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
    </>
  );
};

export default ContentLayer;