import React, { useState } from 'react';
import { VideoFeed } from './VideoFeed';
import { VirtualKeyboard } from './VirtualKeyboard';
import { TouchKeyboard } from './keyboard/TouchKeyboard';
import { MessageDisplay } from './message/MessageDisplay';
import { EyeCursor } from './EyeCursor';
import { LanguageSelect } from './voice/LanguageSelect';
import { VoiceSelect } from './voice/VoiceSelect';
import { PermissionsRequest } from '../shared/PermissionsRequest';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { AlertCircle, Keyboard } from 'lucide-react';
import { useCamera } from '../../hooks/useCamera';
import { useEyeTracking } from '../../hooks/useEyeTracking';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';

export const EyeMovementControl: React.FC = () => {
  const [message, setMessage] = useState('');
  const [hasPermissions, setHasPermissions] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const { videoRef, startCamera, error: cameraError } = useCamera();
  const { 
    isTracking, 
    isModelLoading, 
    error: modelError,
    cursorPosition, 
    startTracking,
    stopTracking
  } = useEyeTracking(videoRef);
  const {
    voices,
    selectedVoice,
    selectedLanguage,
    languages,
    setSelectedVoice,
    setSelectedLanguage,
    speak
  } = useSpeechSynthesis();

  const handlePermissionsGranted = async () => {
    setHasPermissions(true);
    await startCamera();
    await startTracking();
  };

  const handleLetterSelect = (letter: string) => {
    if (letter === 'BACKSPACE') {
      setMessage(prev => prev.slice(0, -1));
    } else {
      setMessage(prev => prev + letter);
    }
  };

  const handleSpeak = () => {
    if (message) {
      speak(message);
    }
  };

  const toggleKeyboard = () => {
    setShowKeyboard(!showKeyboard);
  };

  if (!hasPermissions) {
    return <PermissionsRequest onPermissionsGranted={handlePermissionsGranted} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Eye Movement Control</h1>
          <button
            onClick={toggleKeyboard}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Keyboard className="w-5 h-5" />
            {showKeyboard ? 'Hide Keyboard' : 'Show Keyboard'}
          </button>
        </div>
        
        {isModelLoading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
            <LoadingSpinner />
            <span className="ml-2">Loading eye tracking model...</span>
          </div>
        )}

        {modelError && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{modelError}</span>
          </div>
        )}
        
        <VideoFeed 
          videoRef={videoRef} 
          isTracking={isTracking}
          error={cameraError}
        />

        <div className="grid grid-cols-2 gap-4 mb-6">
          <LanguageSelect
            languages={languages}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
          <VoiceSelect
            voices={voices}
            selectedVoice={selectedVoice}
            selectedLanguage={selectedLanguage}
            onVoiceChange={setSelectedVoice}
          />
        </div>

        <MessageDisplay 
          message={message} 
          onSpeak={handleSpeak} 
        />
        
        {showKeyboard && (
          <VirtualKeyboard 
            cursorPosition={cursorPosition}
            onLetterSelect={handleLetterSelect} 
          />
        )}

        <TouchKeyboard onKeyPress={handleLetterSelect} />

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">How to use:</h3>
          <ul className="space-y-2">
            <li>• Select your preferred language and voice above</li>
            <li>• Use the touch keyboard below to type directly</li>
            <li>• Click "Show Keyboard" to use eye tracking keyboard</li>
            <li>• Look at letters to select them with eye tracking</li>
            <li>• Click "Speak Message" to hear your message spoken</li>
          </ul>
        </div>
      </div>

      {isTracking && showKeyboard && <EyeCursor position={cursorPosition} />}
    </div>
  );
};