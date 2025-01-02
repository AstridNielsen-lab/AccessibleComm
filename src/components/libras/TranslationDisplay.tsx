import React from 'react';
import { MessageCircle, Volume2, Trash2 } from 'lucide-react';

interface TranslationDisplayProps {
  translation: string;
  onClear: () => void;
}

export const TranslationDisplay: React.FC<TranslationDisplayProps> = ({ 
  translation,
  onClear
}) => {
  const speakTranslation = () => {
    if (translation) {
      const speech = new SpeechSynthesisUtterance(translation);
      speech.lang = 'pt-BR';
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-6 rounded-lg min-h-[300px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MessageCircle size={20} />
            Translation
          </h2>
          {translation && (
            <button
              onClick={onClear}
              className="text-gray-500 hover:text-red-500 transition-colors"
              title="Clear translation"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
        <p className="text-xl leading-relaxed">
          {translation || 'Translation will appear here...'}
        </p>
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
  );
};