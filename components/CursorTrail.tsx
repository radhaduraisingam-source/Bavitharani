import React, { useEffect, useRef, useState } from 'react';
import { Position } from '../types';

const CursorTrail: React.FC = () => {
  const [trail, setTrail] = useState<{ pos: Position; id: number; opacity: number }[]>([]);
  const requestRef = useRef<number>(0);
  const counterRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      counterRef.current += 1;
      // Only add a heart every few frames to improve performance
      if (counterRef.current % 3 === 0) {
        setTrail((prev) => [
          ...prev,
          { pos: { x: e.clientX, y: e.clientY }, id: Date.now(), opacity: 1 },
        ]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      setTrail((prev) =>
        prev
          .map((item) => ({ ...item, opacity: item.opacity - 0.05 }))
          .filter((item) => item.opacity > 0)
      );
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Don't render on touch devices (simplified check)
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {trail.map((item) => (
        <div
          key={item.id}
          className="absolute text-sm text-pink-500"
          style={{
            left: item.pos.x,
            top: item.pos.y,
            opacity: item.opacity,
            transform: `translate(-50%, -50%) scale(${item.opacity})`,
          }}
        >
          💕
        </div>
      ))}
    </div>
  );
};

export default CursorTrail;