import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  // Generate static hearts to avoid hydration mismatch/re-renders
  const [hearts] = useState(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 10 + 5}s`,
      animationDelay: `${Math.random() * 5}s`,
      size: `${Math.random() * 20 + 10}px`,
      opacity: Math.random() * 0.3 + 0.1
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-300 animate-float"
          style={{
            left: heart.left,
            bottom: '-10%',
            fontSize: heart.size,
            opacity: heart.opacity,
            animationDuration: heart.animationDuration,
            animationDelay: heart.animationDelay,
          }}
        >
          💖
        </div>
      ))}
      {hearts.map((heart) => (
        <div
          key={`emoji-${heart.id}`}
          className="absolute text-red-400 animate-float"
          style={{
            left: `${parseFloat(heart.left) + 5}%`,
            bottom: '-20%',
            fontSize: heart.size,
            opacity: heart.opacity,
            animationDuration: `${parseFloat(heart.animationDuration) + 2}s`,
            animationDelay: `${parseFloat(heart.animationDelay) + 1}s`,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;