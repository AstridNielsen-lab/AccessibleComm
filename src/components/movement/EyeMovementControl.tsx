import React, { useState, useEffect } from 'react';
import { useWebgazer } from '../../hooks/useWebgazer';
import { VirtualKeyboard } from './VirtualKeyboard';
import { MessageDisplay } from './MessageDisplay';
import { CalibrationScreen } from './CalibrationScreen';
import { useFacialGestures } from '../../hooks/useFacialGestures';
import { PermissionsRequest } from '../PermissionsRequest';
import { useCamera } from '../../hooks/useCamera';
import { useEyeTracking } from '../../hooks/useEyeTracking';

export const EyeMovementControl: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isCalibrating, setIsCalibrating] = useState(true);
  const [hasPermissions, setHasPermissions] = useState(false);
  const { startTracking } = useWebgazer();
  const { currentGesture } = useFacialGestures();
  const { videoRef, startCamera } = useCamera();
  const { isTracking, startTracking: startEyeTracking } = useEyeTracking(videoRef);

  const handlePermissionsGranted = async () => {
    setHasPermissions(true);
    await startCamera();
    await startEyeTracking();
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
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Eye Movement Control</h1>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Left column: Video feed and message controls */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="relative aspect-video mb-6 bg-gray-100 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {isTracking && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Tracking Active
                </div>
              )}
            </div>

            <MessageDisplay message={message} onSpeak={handleSpeak} />
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Gesture Guide:</h3>
              <ul className="space-y-2">
                <li>• Blink: Select letter</li>
                <li>• Smile: Delete last letter</li>
                <li>• Open mouth: Speak message</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right column: Calibration or keyboard */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {isCalibrating ? (
            <CalibrationScreen onComplete={handleCalibrationComplete} />
          ) : (
            <VirtualKeyboard onLetterSelect={handleLetterSelect} />
          )}
        </div>
      </div>
    </div>
  );
};