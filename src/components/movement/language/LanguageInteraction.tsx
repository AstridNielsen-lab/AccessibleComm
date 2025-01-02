import React, { useState } from 'react';
import { MessageCircle, Globe2 } from 'lucide-react';

interface LanguageInteractionProps {
  onLanguageSelect: (language: string) => void;
}

export const LanguageInteraction: React.FC<LanguageInteractionProps> = ({ onLanguageSelect }) => {
  const [userLanguage, setUserLanguage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const languages = [
    { code: 'en', name: 'I speak English' },
    { code: 'pt', name: 'Eu falo Português' },
    { code: 'es', name: 'Hablo Español' },
    { code: 'fr', name: 'Je parle Français' },
    { code: 'de', name: 'Ich spreche Deutsch' }
  ];

  const handleLanguageSelect = (code: string) => {
    setUserLanguage(code);
    onLanguageSelect(code);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Globe2 className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Select Your Language</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            className={`p-3 rounded-lg border-2 transition-all
              ${userLanguage === lang.code 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
          >
            <span className="block text-sm font-medium">{lang.name}</span>
          </button>
        ))}
      </div>

      {showConfirmation && (
        <div className="mt-4 flex items-center gap-2 text-green-600 animate-fade-in">
          <MessageCircle className="w-5 h-5" />
          <span>Language preference saved!</span>
        </div>
      )}
    </div>
  );
};