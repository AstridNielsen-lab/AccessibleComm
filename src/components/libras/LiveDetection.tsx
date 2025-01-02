import React, { useRef, useState, useEffect } from 'react';
import { useCamera } from '../../hooks/useCamera';
import { useSignDetection } from '../../hooks/useSignDetection';

interface LiveDetectionProps {
  onTranslationUpdate: (translation: string) => void;
}

export const LiveDetection: React.FC<LiveDetectionProps> = ({ onTranslationUpdate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { startCamera, stream } = useCamera();
  const { isDetecting, startDetection, stopDetection } = useSignDetection({
    videoRef,
    onDetection: onTranslationUpdate
  });

  // Initialize camera when component mounts
  useEffect(() => {
    const initCamera = async () => {
      await startCamera();
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
      }
    };
    initCamera();
  }, [startCamera, stream]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        {isDetecting && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
            Detection Active
          </div>
        )}
      </div>

      <button
        onClick={isDetecting ? stopDetection : startDetection}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
          isDetecting ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isDetecting ? 'Stop Detection' : 'Start Detection'}
      </button>

      {isDetecting && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Common Libras Signs:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Wave hands for "Hello"</li>
            <li>• Point to self and smile for "I am happy"</li>
            <li>• Wave and point for "Thank you"</li>
          </ul>
        </div>
      )}
    </div>
  );
};