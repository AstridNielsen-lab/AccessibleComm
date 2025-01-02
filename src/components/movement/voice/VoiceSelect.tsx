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
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Voice</label>
      <div className="flex items-center gap-2 relative">
        <Mic className="absolute left-3 w-5 h-5 text-gray-500" />
        <select
          value={selectedVoice?.voiceURI}
          onChange={(e) => {
            const voice = voices.find(v => v.voiceURI === e.target.value);
            if (voice) onVoiceChange(voice);
          }}
          className="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 
                     bg-white shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          {filteredVoices.length > 0 ? (
            filteredVoices.map((voice) => (
              <option key={voice.voiceURI} value={voice.voiceURI}>
                {voice.name}
              </option>
            ))
          ) : (
            <option value="">No voices available for this language</option>
          )}
        </select>
      </div>
    </div>
  );
};