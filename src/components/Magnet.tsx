import React, { useRef, useState, useEffect } from 'react';

export interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Check if mouse is within element bounds + padding
      const isWithinX = mouseX >= rect.left - padding && mouseX <= rect.right + padding;
      const isWithinY = mouseY >= rect.top - padding && mouseY <= rect.bottom + padding;

      if (isWithinX && isWithinY) {
        const dx = (mouseX - centerX) / strength;
        const dy = (mouseY - centerY) / strength;
        setTransform({ x: dx, y: dy });
        setIsActive(true);
      } else {
        if (isActive) {
          setTransform({ x: 0, y: 0 });
          setIsActive(false);
        }
      }
    };

    const handleMouseLeave = () => {
      setTransform({ x: 0, y: 0 });
      setIsActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [padding, strength, isActive]);

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
