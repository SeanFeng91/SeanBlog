import React, { useEffect, useRef } from 'react';

const ProfileSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof gsap !== 'undefined') {
      gsap.from(sectionRef.current.children, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          toggleActions: 'play none none reverse'
        }
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="content-section w-screen h-screen flex items-center justify-center bg-gray-900 text-white">
      {/* ... 内容 ... */}
    </section>
  );
};

export default ProfileSection;