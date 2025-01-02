import React, { useState } from 'react';
import { Camera, Send } from 'lucide-react';
import { useVisionAnalysis } from '../../hooks/useVisionAnalysis';
import { LoadingSpinner } from '../shared/LoadingSpinner';

interface VisionAnalysisProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  onAnalysis: (result: string) => void;
}

export const VisionAnalysis: React.FC<VisionAnalysisProps> = ({ videoRef, onAnalysis }) => {
  const [prompt, setPrompt] = useState('');
  const { analyzeFrame, isAnalyzing, error } = useVisionAnalysis();

  const handleAnalysis = async () => {
    if (!prompt.trim()) return;
    
    const result = await analyzeFrame(videoRef, prompt);
    if (result) {
      onAnalysis(result);
      setPrompt('');
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Camera className="w-5 h-5 text-blue-600" />
        Vision Analysis
      </h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
            Ask about what you see
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What can you tell me about..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              disabled={isAnalyzing}
            />
            <button
              onClick={handleAnalysis}
              disabled={isAnalyzing || !prompt.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <LoadingSpinner />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
};