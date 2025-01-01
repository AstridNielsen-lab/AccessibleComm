import { useEffect, useState } from 'react';
import webgazer from 'webgazer';

export const useGazeTracking = () => {
  const [gazedLetter, setGazedLetter] = useState<string | null>(null);
  
  useEffect(() => {
    const handleGaze = (data: any) => {
      if (data && data.x && data.y) {
        // Get element at gaze position
        const element = document.elementFromPoint(data.x, data.y);
        if (element?.tagName === 'BUTTON' && element.textContent) {
          setGazedLetter(element.textContent);
        }
      }
    };

    webgazer.setGazeListener(handleGaze);

    return () => {
      webgazer.clearGazeListener();
    };
  }, []);

  return { gazedLetter };
};