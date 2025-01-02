import React from 'react';

interface EyeCursorProps {
  position: { x: number; y: number };
}

export const EyeCursor: React.FC<EyeCursorProps> = ({ position }) => {
  return (
    <div
      className="fixed w-6 h-6 pointer-events-none z-50 transition-all duration-75"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="w-full h-full rounded-full border-2 border-blue-500 bg-blue-200/50 animate-pulse" />
    </div>
  );
};