'use client'
import { useEffect, useRef, useState } from 'react';

const useMouseTrack = () => {
  const frame = useRef(null);
  const [mouseData, setMouseData] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const calculateMousePosition = (e) => {
      if (frame.current) cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame(() => {
        setMouseData({
          x: e.clientX,
          y: e.clientY,
        });
      });
    };

    window.addEventListener('mousemove', calculateMousePosition, {
      passive: true,
    });

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      window.removeEventListener('mousemove', calculateMousePosition);
    };
  }, []);

  return mouseData;
};

export default useMouseTrack;

