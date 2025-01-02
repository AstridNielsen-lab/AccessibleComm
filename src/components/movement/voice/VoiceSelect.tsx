import React from 'react';
import { Voice } from '../../../types/voice';
import { Mic } from 'lucide-react';

interface VoiceSelectProps {
  voices: Voice[];
  selectedVoice: Voice | null;
  selectedLanguage: string;
  onVoiceChange: (voice: Voice) => void;
}

export const VoiceSelect: React.FC<VoiceSelectProps> = ({
  voices,
  selectedVoice,
  selectedLanguage,
  onVoiceChange
}) => {
  const filteredVoices = voices.filter(voice => voice.lang.startsWith(selectedLanguage.split('-')[0]));

  return (
    <div className="flex items-center gap-2">
      <Mic className="w-5 h-5 text-gray-600" />
      <select
        value={selectedVoice?.voiceURI}
        onChange={(e) => {
          const voice = voices.find(v => v.voiceURI === e.target.value);
          if (voice) onVoiceChange(voice);
        }}
        className="block w-full rounded-lg border-gray-300 shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500"
      >
        {filteredVoices.map((voice) => (
          <option key={voice.voiceURI} value={voice.voiceURI}>
            {voice.name}
          </option>
        ))}
      </select>
    </div>
  );
};