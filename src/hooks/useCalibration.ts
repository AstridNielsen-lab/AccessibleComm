import { useState } from 'react';

export interface CalibrationPoint {
  x: number;
  y: number;
  completed: boolean;
}

export const useCalibration = () => {
  const [calibrationPoints, setCalibrationPoints] = useState<CalibrationPoint[]>([
    { x: 100, y: 100, completed: false },
    { x: window.innerWidth - 100, y: 100, completed: false },
    { x: window.innerWidth - 100, y: window.innerHeight - 100, completed: false },
    { x: 100, y: window.innerHeight - 100, completed: false },
    { x: window.innerWidth / 2, y: window.innerHeight / 2, completed: false },
  ]);

  const markPointComplete = (index: number) => {
    setCalibrationPoints(points => 
      points.map((point, i) => 
        i === index ? { ...point, completed: true } : point
      )
    );
  };

  const isCalibrationComplete = () => 
    calibrationPoints.every(point => point.completed);

  return {
    calibrationPoints,
    markPointComplete,
    isCalibrationComplete,
  };
};