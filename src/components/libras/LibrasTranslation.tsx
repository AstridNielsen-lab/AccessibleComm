import React, { useRef, useState, useEffect } from 'react';
import { useFaceLandmarks } from '../../hooks/useFaceLandmarks';
import { MessageCircle, Volume2 } from 'lucide-react';
import { GeminiChat } from '../Chat/GeminiChat';
import { usePermissions } from '../../hooks/usePermissions';
import { SignRecorder } from './SignRecorder';
import { VisionAnalysis } from './VisionAnalysis';
import { useCamera } from '../../hooks/useCamera';

export const LibrasTranslation: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [translation, setTranslation] = useState('');
  const { startDetection, stopDetection } = useFaceLandmarks();
  const { hasPermissions, requestPermissions } = usePermissions();
  const { videoRef, startCamera, stopCamera, error: cameraError } = useCamera();

  useEffect(() => {
    const initializeCamera = async () => {
      try {
        if (!hasPermissions) {
          await requestPermissions();
        }
        await startCamera();
      } catch (error) {
        console.error('Error initializing camera:', error);
      }
    };

    initializeCamera();

    return () => {
      stopCamera();
      if (isRecording) {
        stopDetection();
        setIsRecording(false);
      }
    };
  }, [hasPermissions, requestPermissions, startCamera, stopCamera, isRecording, stopDetection]);

  const toggleRecording = async () => {
    if (isRecording) {
      stopDetection();
      setIsRecording(false);
    } else {
      if (videoRef.current) {
        await startDetection(videoRef.current);
        setIsRecording(true);
      }
    }
  };

  const speakTranslation = () => {
    if (translation) {
      const speech = new SpeechSynthesisUtterance(translation);
      window.speechSynthesis.speak(speech);
    }
  };

  const handleVisionAnalysis = (result: string) => {
    setTranslation(result);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid lg:grid-cols-2 gap-6 min-h-[600px]">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Libras Translation</h1>
          
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
            {isRecording && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                Recording
              </div>
            )}
            {cameraError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="bg-white p-4 rounded-lg text-red-600">
                  {cameraError.message}
                </div>
              </div>
            )}
          </div>
          
          <VisionAnalysis 
            videoRef={videoRef}
            onAnalysis={handleVisionAnalysis}
          />
          
          <SignRecorder videoRef={videoRef} />
          
          <div className="space-y-4">
            <button
              onClick={toggleRecording}
              disabled={!videoRef.current}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <MessageCircle size={20} />
                Analysis Result
              </h2>
              <p className="text-xl mb-4">{translation || 'Ask a question about what you see...'}</p>
              <button
                onClick={speakTranslation}
                disabled={!translation}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Volume2 size={20} />
                Speak Result
              </button>
            </div>
          </div>
        </div>

        <div className="h-full">
          <GeminiChat />
        </div>
      </div>
    </div>
  );
};