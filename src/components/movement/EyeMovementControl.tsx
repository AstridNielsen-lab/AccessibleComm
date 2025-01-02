import React, { useState } from 'react';
import { VideoFeed } from './VideoFeed';
import { VirtualKeyboard } from './keyboard/VirtualKeyboard';
import { MessageDisplay } from './message/MessageDisplay';
import { PermissionsRequest } from '../shared/PermissionsRequest';
import { useCamera } from '../../hooks/useCamera';
import { useEyeTracking } from '../../hooks/useEyeTracking';
import { useFacialGestures } from '../../hooks/useFacialGestures';

export const EyeMovementControl: React.FC = () => {
  const [message, setMessage] = useState('');
  const [hasPermissions, setHasPermissions] = useState(false);
  const { videoRef, startCamera } = useCamera();
  const { isTracking, startTracking: startEyeTracking } = useEyeTracking(videoRef);
  const { currentGesture } = useFacialGestures();

  const handlePermissionsGranted = async () => {
    setHasPermissions(true);
    await startCamera();
    await startEyeTracking();
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
        
        <VideoFeed 
          videoRef={videoRef} 
          isTracking={isTracking} 
        />

        <MessageDisplay 
          message={message} 
          onSpeak={handleSpeak} 
        />
        
        <VirtualKeyboard 
          onLetterSelect={handleLetterSelect} 
        />
        
        <GestureGuide />
      </div>
    </div>
  );
};