import React from 'react';

interface VideoRecorderProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isRecording: boolean;
  onToggleRecording: () => void;
}

export const VideoRecorder: React.FC<VideoRecorderProps> = ({
  videoRef,
  isRecording,
  onToggleRecording,
}) => {
  return (
    <div>
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        />
      </div>
      <button
        onClick={onToggleRecording}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
          isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
};