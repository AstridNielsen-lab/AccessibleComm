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
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Language</label>
      <div className="flex items-center gap-2 relative">
        <Globe2 className="absolute left-3 w-5 h-5 text-gray-500" />
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 
                     bg-white shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.nativeName} ({lang.name})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};