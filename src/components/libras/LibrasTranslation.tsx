import React, { useRef, useState, useEffect } from 'react';
import { useFaceLandmarks } from '../../hooks/useFaceLandmarks';
import { MessageCircle, Volume2 } from 'lucide-react';
import { GeminiChat } from '../Chat/GeminiChat';
import { usePermissions } from '../../hooks/usePermissions';
import { SignRecorder } from './SignRecorder';

export const LibrasTranslation: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [translation, setTranslation] = useState('');
  const { startDetection, stopDetection } = useFaceLandmarks();
  const { hasPermissions, requestPermissions } = usePermissions();

  useEffect(() => {
    const initializeCamera = async () => {
      try {
        if (!hasPermissions) {
          await requestPermissions();
        }
        
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user'
          }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    initializeCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [hasPermissions, requestPermissions]);

  const toggleRecording = async () => {
    if (isRecording) {
      stopDetection();
      setIsRecording(false);
    } else {
      await startDetection(videoRef.current!);
      setIsRecording(true);
    }
  };

  const speakTranslation = () => {
    if (translation) {
      const speech = new SpeechSynthesisUtterance(translation);
      window.speechSynthesis.speak(speech);
    }
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
          </div>
          
          <SignRecorder videoRef={videoRef} />
          
          <div className="space-y-4">
            <button
              onClick={toggleRecording}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <MessageCircle size={20} />
                Translation
              </h2>
              <p className="text-xl mb-4">{translation || 'Translation will appear here...'}</p>
              <button
                onClick={speakTranslation}
                disabled={!translation}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Volume2 size={20} />
                Speak Translation
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