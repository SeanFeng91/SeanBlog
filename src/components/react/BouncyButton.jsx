import React, { useState } from 'react';

export default function BouncyButton({ text }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        transition: 'transform 0.1s',
        transform: isPressed ? 'scale(0.95)' : 'scale(1)',
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {text}
    </button>
  );
}