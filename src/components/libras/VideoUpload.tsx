import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { useSignDetection } from '../../hooks/useSignDetection';

interface VideoUploadProps {
  onTranslationUpdate: (translation: string) => void;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({ onTranslationUpdate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { isDetecting, startDetection, stopDetection } = useSignDetection({
    videoRef,
    onDetection: onTranslationUpdate
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (videoRef.current) {
        videoRef.current.src = URL.createObjectURL(file);
      }
    }
  };

  const handleAnalyze = async () => {
    if (selectedFile && videoRef.current) {
      startDetection();
      videoRef.current.play();
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {!selectedFile ? (
          <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
            <Upload size={48} className="text-gray-400 mb-2" />
            <span className="text-gray-600">Click to upload video</span>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            controls
          />
        )}
      </div>

      {selectedFile && (
        <button
          onClick={handleAnalyze}
          disabled={isDetecting}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Analyze Video
        </button>
      )}
    </div>
  );
};