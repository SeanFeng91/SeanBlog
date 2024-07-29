// import React, { useEffect, useRef } from 'react';
// import BackgroundLayer from './BackgroundLayer';
// import ContentLayer from './ContentLayer';

// const AboutPage = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
//       gsap.registerPlugin(ScrollTrigger);
      
//       const sections = gsap.utils.toArray('.content-section');
      
//       gsap.to(sections, {
//         xPercent: -100 * (sections.length - 1),
//         ease: "none",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           pin: true,
//           scrub: 1,
//           snap: 1 / (sections.length - 1),
//           end: () => "+=" + (containerRef.current?.offsetWidth || 0)
//         }
//       });
//     }

//     return () => {
//       if (typeof ScrollTrigger !== 'undefined') {
//         ScrollTrigger.getAll().forEach(t => t.kill());
//       }
//     };
//   }, []);

//   return (
//     <div className="overflow-hidden">
//       <BackgroundLayer />
//       <div ref={containerRef} className="relative w-[400vw] h-screen flex flex-nowrap">
//         <ContentLayer />
//       </div>
//     </div>
//   );
// };

// export default AboutPage;

import React, { useEffect, useRef } from 'react';
import ProfileSection from './ProfileSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';
import BackgroundLayer from './BackgroundLayer';

const AboutPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      const sections = gsap.utils.toArray('.content-section');
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + (containerRef.current?.offsetWidth || 0)
        }
      });
    }

    return () => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <BackgroundLayer />
      <div ref={containerRef} className="flex flex-nowrap">
        <ProfileSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
      </div>
    </div>
  );
};

export default AboutPage;