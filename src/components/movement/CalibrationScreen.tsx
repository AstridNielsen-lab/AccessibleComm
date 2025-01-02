import React, { useEffect } from 'react';
import { CalibrationPoint } from './CalibrationPoint';
import { useCalibration } from '../../hooks/useCalibration';
import { useFacialGestures } from '../../hooks/useFacialGestures';

interface CalibrationScreenProps {
  onComplete: () => void;
}

export const CalibrationScreen: React.FC<CalibrationScreenProps> = ({ onComplete }) => {
  const { calibrationPoints, markPointComplete, isCalibrationComplete } = useCalibration();
  const { currentGesture } = useFacialGestures();

  useEffect(() => {
    if (isCalibrationComplete()) {
      onComplete();
    }
  }, [calibrationPoints, onComplete]);

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-4">Calibration</h2>
      <p className="mb-8">
        Look at each point and blink to calibrate. The point will turn green when calibrated.
      </p>
      
      <div className="relative h-[400px] bg-gray-50 rounded-lg">
        {calibrationPoints.map((point, index) => (
          <CalibrationPoint
            key={index}
            {...point}
            onComplete={() => markPointComplete(index)}
          />
        ))}
      </div>

      <div className="mt-4">
        <p className="text-lg font-medium">
          Current gesture detected: {currentGesture}
        </p>
      </div>
    </div>
  );
};