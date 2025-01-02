import { useState, useEffect } from 'react';
import { useWebgazer } from './useWebgazer';
import { generateResponse } from '../services/gemini';

export const useEyeMovement = () => {
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [isTracking, setIsTracking] = useState(false);
  const { startTracking: startWebgazer } = useWebgazer();

  const startTracking = async () => {
    await startWebgazer();
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  useEffect(() => {
    if (isTracking) {
      // Handle eye movement detection and Gemini interaction
      const handleGaze = async (data: { x: number; y: number }) => {
        setCurrentPosition(data);
        
        // Example of triggering Gemini based on eye movement
        if (data.y < 100) { // Looking up
          const response = await generateResponse("User looked up");
          console.log("Gemini response:", response);
        }
      };

      // Set up eye tracking listener
      window.webgazer.setGazeListener(handleGaze);
    }

    return () => {
      if (isTracking) {
        window.webgazer.clearGazeListener();
      }
    };
  }, [isTracking]);

  return {
    isTracking,
    currentPosition,
    startTracking,
    stopTracking,
  };
};