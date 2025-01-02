import React from 'react';
import { Language } from '../../../types/voice';
import { Globe2 } from 'lucide-react';

interface LanguageSelectProps {
  languages: Language[];
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export const LanguageSelect: React.FC<LanguageSelectProps> = ({
  languages,
  selectedLanguage,
  onLanguageChange
}) => {
  return (
    <div className="flex items-center gap-2">
      <Globe2 className="w-5 h-5 text-gray-600" />
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="block w-full rounded-lg border-gray-300 shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName} ({lang.name})
          </option>
        ))}
      </select>
    </div>
  );
};