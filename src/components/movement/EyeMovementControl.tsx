import React, { useEffect, useState } from 'react';
import { useWebgazer } from '../../hooks/useWebgazer';
import { VirtualKeyboard } from './VirtualKeyboard';
import { MessageDisplay } from './MessageDisplay';
import { Camera } from 'lucide-react';
import { useGazeTracking } from '../../hooks/useGazeTracking';

export const EyeMovementControl: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isCalibrating, setIsCalibrating] = useState(true);
  const { isReady, calibrate } = useWebgazer();
  const { gazedLetter } = useGazeTracking();

  useEffect(() => {
    if (gazedLetter) {
      setMessage(prev => prev + gazedLetter);
    }
  }, [gazedLetter]);

  const handleSpeak = () => {
    if (message) {
      const speech = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Eye Movement Control</h1>
        
        {isCalibrating ? (
          <div className="text-center p-8">
            <Camera className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-4">Camera Calibration</h2>
            <p className="mb-4">Look at each corner of the screen and blink to calibrate</p>
            <button
              onClick={async () => {
                await calibrate();
                setIsCalibrating(false);
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Start Calibration
            </button>
          </div>
        ) : (
          <>
            <MessageDisplay message={message} onSpeak={handleSpeak} />
            <VirtualKeyboard onLetterSelect={() => {}} />
          </>
        )}
      </div>
    </div>
  );
};