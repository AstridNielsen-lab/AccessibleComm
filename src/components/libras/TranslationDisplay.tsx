import React from 'react';
import { MessageCircle, Volume2 } from 'lucide-react';

interface TranslationDisplayProps {
  translation: string;
}

export const TranslationDisplay: React.FC<TranslationDisplayProps> = ({ translation }) => {
  const speakTranslation = () => {
    if (translation) {
      const speech = new SpeechSynthesisUtterance(translation);
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-6 rounded-lg min-h-[300px]">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MessageCircle size={20} />
          Translation
        </h2>
        <p className="text-xl">{translation || 'Translation will appear here...'}</p>
      </div>

      <button
        onClick={speakTranslation}
        disabled={!translation}
        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        <Volume2 size={20} />
        Speak Translation
      </button>
    </div>
  );
};