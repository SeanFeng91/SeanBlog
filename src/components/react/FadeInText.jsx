import React, { useState, useEffect } from 'react';

export default function FadeInText({ text }) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(1), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      opacity,
      transition: 'opacity 1s ease-in-out',
    }}>
      {text}
    </div>
  );
}