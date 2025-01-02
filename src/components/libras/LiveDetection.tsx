import React, { useRef, useEffect, useState } from 'react';
import { useCamera } from '../../hooks/useCamera';
import { useSignRecognition } from '../../hooks/useSignRecognition';
import { useHandTracking } from '../../hooks/useHandTracking';
import { HandTrackingOverlay } from './HandTrackingOverlay';
import { DetectionGrid } from './DetectionGrid';

interface LiveDetectionProps {
  onTranslationUpdate: (translation: string) => void;
}

export const LiveDetection: React.FC<LiveDetectionProps> = ({ onTranslationUpdate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });
  const { startCamera, error } = useCamera();
  const { currentSign, isRecognizing, startRecognition, stopRecognition } = useSignRecognition();
  const { handPoints, updateHandPoints } = useHandTracking();

  useEffect(() => {
    let mounted = true;

    const initCamera = async () => {
      if (!videoRef.current) return;
      
      const stream = await startCamera();
      if (stream && mounted && videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
          setVideoDimensions({
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight
          });
        } catch (err) {
          console.error('Error playing video:', err);
        }
      }
    };

    initCamera();

    return () => {
      mounted = false;
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      stopRecognition();
    };
  }, [startCamera, stopRecognition]);

  useEffect(() => {
    if (currentSign) {
      onTranslationUpdate(currentSign);
    }
  }, [currentSign, onTranslationUpdate]);

  const handleToggleDetection = () => {
    if (isRecognizing) {
      stopRecognition();
    } else if (videoRef.current) {
      startRecognition(videoRef.current, updateHandPoints);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center text-red-500">
            {error}
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-contain"
            />
            {isRecognizing && (
              <>
                <DetectionGrid
                  videoWidth={videoDimensions.width}
                  videoHeight={videoDimensions.height}
                />
                {handPoints.length > 0 && (
                  <HandTrackingOverlay
                    points={handPoints}
                    videoWidth={videoDimensions.width}
                    videoHeight={videoDimensions.height}
                  />
                )}
              </>
            )}
          </>
        )}
        {isRecognizing && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
            Detection Active
          </div>
        )}
        {currentSign && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white p-2 rounded text-center">
            <span className="text-lg font-semibold">{currentSign}</span>
          </div>
        )}
      </div>

      <button
        onClick={handleToggleDetection}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
          isRecognizing ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isRecognizing ? 'Stop Detection' : 'Start Detection'}
      </button>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-2">Common Libras Signs:</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Raise hand for "Olá"</li>
          <li>• Touch chest for "Eu"</li>
          <li>• Wave hand for "Tchau"</li>
          <li>• Point for "Você"</li>
        </ul>
      </div>
    </div>
  );
};