import React, { useState } from 'react';
import { MessageCircle, Upload, Video, Volume2 } from 'lucide-react';
import { LiveDetection } from './LiveDetection';
import { VideoUpload } from './VideoUpload';
import { TranslationDisplay } from './TranslationDisplay';
import { PermissionsRequest } from '../PermissionsRequest';

export const LibrasTranslation: React.FC = () => {
  const [mode, setMode] = useState<'live' | 'upload'>('live');
  const [translation, setTranslation] = useState('');
  const [hasPermissions, setHasPermissions] = useState(false);

  const handleTranslationUpdate = (newTranslation: string) => {
    setTranslation(prev => `${prev}${prev ? ' ' : ''}${newTranslation}`);
  };

  const handlePermissionsGranted = () => {
    setHasPermissions(true);
  };

  const handleClearTranslation = () => {
    setTranslation('');
  };

  if (mode === 'live' && !hasPermissions) {
    return <PermissionsRequest onPermissionsGranted={handlePermissionsGranted} />;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Libras Translation</h1>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setMode('live');
              handleClearTranslation();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              mode === 'live' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Video size={20} />
            Live Detection
          </button>
          <button
            onClick={() => {
              setMode('upload');
              handleClearTranslation();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              mode === 'upload' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Upload size={20} />
            Upload Video
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            {mode === 'live' ? (
              <LiveDetection onTranslationUpdate={handleTranslationUpdate} />
            ) : (
              <VideoUpload onTranslationUpdate={handleTranslationUpdate} />
            )}
          </div>
          
          <TranslationDisplay 
            translation={translation} 
            onClear={handleClearTranslation}
          />
        </div>
      </div>
    </div>
  );
};