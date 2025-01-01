import { useEffect, useState } from 'react';
import webgazer from 'webgazer';

export const useWebgazer = () => {
  const [isReady, setIsReady] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const startTracking = async () => {
    try {
      if (!isInitialized) {
        await webgazer.setRegression('ridge')
          .setTracker('TFFacemesh')
          .begin();
        setIsInitialized(true);
      }
      setIsReady(true);
    } catch (error) {
      console.error('Error starting webgazer:', error);
    }
  };

  const calibrate = async () => {
    // Add calibration points
    const points = [
      { x: 0, y: 0 },
      { x: window.innerWidth, y: 0 },
      { x: window.innerWidth, y: window.innerHeight },
      { x: 0, y: window.innerHeight },
    ];

    await startTracking();
    
    // Add calibration points to WebGazer
    points.forEach(point => {
      webgazer.addCalibrationPoint(point.x, point.y, point.x, point.y);
    });
  };

  useEffect(() => {
    return () => {
      if (isInitialized) {
        try {
          webgazer.end();
        } catch (error) {
          console.error('Error cleaning up webgazer:', error);
        }
      }
    };
  }, [isInitialized]);

  return { isReady, startTracking, calibrate };
};