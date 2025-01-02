import React, { useState } from 'react';
import { Save, Video, StopCircle } from 'lucide-react';
import { useSignRecording } from '../../hooks/useSignRecording';

interface SignRecorderProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const SignRecorder: React.FC<SignRecorderProps> = ({ videoRef }) => {
  const [signName, setSignName] = useState('');
  const { startRecording, stopRecording, isRecording } = useSignRecording();

  const handleStartRecording = async () => {
    if (!signName.trim()) {
      alert('Please enter a name for the sign');
      return;
    }
    await startRecording(videoRef, signName);
  };

  const handleStopRecording = async () => {
    await stopRecording();
    setSignName('');
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Video className="w-5 h-5 text-blue-600" />
        Record New Sign
      </h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="signName" className="block text-sm font-medium text-gray-700 mb-1">
            Sign Name
          </label>
          <input
            type="text"
            id="signName"
            value={signName}
            onChange={(e) => setSignName(e.target.value)}
            placeholder="Enter sign name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            disabled={isRecording}
          />
        </div>

        <button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-white font-medium ${
            isRecording 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isRecording ? (
            <>
              <StopCircle className="w-5 h-5" />
              Stop Recording
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Record Sign
            </>
          )}
        </button>
      </div>
    </div>
  );
};