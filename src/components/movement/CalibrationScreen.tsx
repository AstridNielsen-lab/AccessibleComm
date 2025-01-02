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
    <div className="w-full aspect-video bg-gray-100 rounded-lg relative">
      <div className="absolute inset-0 p-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Calibration</h3>
        <p className="text-center mb-8">
          Look at each point and blink to calibrate. The point will turn green when calibrated.
        </p>
        
        {calibrationPoints.map((point, index) => (
          <CalibrationPoint
            key={index}
            {...point}
            onComplete={() => markPointComplete(index)}
          />
        ))}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <p className="text-lg font-medium">
            Current gesture detected: {currentGesture}
          </p>
        </div>
      </div>
    </div>
  );
};