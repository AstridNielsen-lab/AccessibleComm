import React, { useEffect, useRef, useState } from 'react';
import { useFaceLandmarks } from '../../hooks/useFaceLandmarks';
import { MessageCircle, Volume2 } from 'lucide-react';

export const LibrasTranslation: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [translation, setTranslation] = useState('');
  const { startDetection, stopDetection } = useFaceLandmarks();

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
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Libras Translation</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
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
              onClick={toggleRecording}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
          </div>
          
          <div>
            <div className="bg-gray-50 p-4 rounded-lg min-h-[200px] mb-4">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <MessageCircle size={20} />
                Translation
              </h2>
              <p className="text-xl">{translation || 'Translation will appear here...'}</p>
            </div>
            <button
              onClick={speakTranslation}
              disabled={!translation}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Volume2 size={20} />
              Speak Translation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};