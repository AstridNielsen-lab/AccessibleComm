import React from 'react';

interface CalibrationPointProps {
  x: number;
  y: number;
  completed: boolean;
  onComplete: () => void;
}

export const CalibrationPoint: React.FC<CalibrationPointProps> = ({
  x, y, completed, onComplete
}) => {
  return (
    <div
      className={`absolute w-8 h-8 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300
        ${completed ? 'bg-green-500 scale-90' : 'bg-blue-500 animate-pulse'}`}
      style={{ left: x, top: y }}
      onClick={onComplete}
    />
  );
};