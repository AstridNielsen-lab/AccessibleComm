import React from 'react';
import { MessageCircle } from 'lucide-react';

interface TranslationDisplayProps {
  translation: string;
  detectedWord: string;
}

export const TranslationDisplay: React.FC<TranslationDisplayProps> = ({
  translation,
  detectedWord,
}) => {
  return (
    <div>
      <div className="bg-gray-50 p-4 rounded-lg min-h-[200px] mb-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <MessageCircle size={20} />
          Translation
        </h2>
        <p className="text-xl">{translation || 'Translation will appear here...'}</p>
        <p className="text-md mt-2 text-gray-600">
          Detected Gesture: {detectedWord || 'Awaiting gesture...'}
        </p>
      </div>
    </div>
  );
};