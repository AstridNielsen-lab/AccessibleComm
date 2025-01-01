import React, { useState } from 'react';
import { useWebgazer } from '../../hooks/useWebgazer';
import { VirtualKeyboard } from './VirtualKeyboard';
import { MessageDisplay } from './MessageDisplay';
import { CalibrationScreen } from './CalibrationScreen';
import { useFacialGestures } from '../../hooks/useFacialGestures';
import { PermissionsRequest } from '../PermissionsRequest';

export const EyeMovementControl: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isCalibrating, setIsCalibrating] = useState(true);
  const [hasPermissions, setHasPermissions] = useState(false);
  const { startTracking } = useWebgazer();
  const { currentGesture } = useFacialGestures();

  const handlePermissionsGranted = () => {
    setHasPermissions(true);
  };

  const handleCalibrationComplete = async () => {
    await startTracking();
    setIsCalibrating(false);
  };

  const handleLetterSelect = (letter: string) => {
    if (currentGesture === 'blink') {
      setMessage(prev => prev + letter);
    }
  };

  const handleSpeak = () => {
    if (message) {
      const speech = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(speech);
    }
  };

  if (!hasPermissions) {
    return <PermissionsRequest onPermissionsGranted={handlePermissionsGranted} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Eye Movement Control</h1>
        
        {isCalibrating ? (
          <CalibrationScreen onComplete={handleCalibrationComplete} />
        ) : (
          <>
            <MessageDisplay message={message} onSpeak={handleSpeak} />
            <VirtualKeyboard onLetterSelect={handleLetterSelect} />
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Gesture Guide:</h3>
              <ul className="space-y-2">
                <li>• Blink: Select letter</li>
                <li>• Smile: Delete last letter</li>
                <li>• Open mouth: Speak message</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};