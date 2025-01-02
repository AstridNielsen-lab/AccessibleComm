import { useEffect, useState, useCallback } from 'react';
import webgazer from 'webgazer';

export const useWebgazer = () => {
  const [isReady, setIsReady] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const startTracking = useCallback(async () => {
    try {
      if (!isInitialized) {
        // Wait for DOM to be ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        await webgazer
          .setRegression('ridge')
          .setTracker('TFFacemesh')
          .begin();

        // Wait for WebGazer to initialize
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsInitialized(true);
      }
      setIsReady(true);
    } catch (error) {
      console.error('Error starting webgazer:', error);
    }
  }, [isInitialized]);

  const calibrate = useCallback(async () => {
    if (!isInitialized) {
      await startTracking();
    }

    const points = [
      { x: 100, y: 100 },
      { x: window.innerWidth - 100, y: 100 },
      { x: window.innerWidth - 100, y: window.innerHeight - 100 },
      { x: 100, y: window.innerHeight - 100 },
    ];

    points.forEach(point => {
      webgazer.addCalibrationPoint(point.x, point.y, point.x, point.y);
    });
  }, [isInitialized, startTracking]);

  useEffect(() => {
    return () => {
      if (isInitialized) {
        try {
          webgazer.end();
          setIsInitialized(false);
          setIsReady(false);
        } catch (error) {
          console.error('Error cleaning up webgazer:', error);
        }
      }
    };
  }, [isInitialized]);

  return { 
    isReady, 
    startTracking,
    calibrate 
  };
};