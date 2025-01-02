import { useState, useEffect } from 'react';
import { Voice, Language } from '../types/voice';

export const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en-US');

  const languages: Language[] = [
    { code: 'en-US', name: 'English', nativeName: 'English' },
    { code: 'pt-BR', name: 'Portuguese', nativeName: 'Português' },
    { code: 'es-ES', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr-FR', name: 'French', nativeName: 'Français' },
    { code: 'de-DE', name: 'German', nativeName: 'Deutsch' },
    { code: 'it-IT', name: 'Italian', nativeName: 'Italiano' },
    { code: 'ja-JP', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko-KR', name: 'Korean', nativeName: '한국어' },
    { code: 'zh-CN', name: 'Chinese', nativeName: '中文' },
  ];

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Set default voice
      const defaultVoice = availableVoices.find(voice => voice.lang === selectedLanguage);
      if (defaultVoice) {
        setSelectedVoice(defaultVoice);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [selectedLanguage]);

  const speak = (text: string) => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.lang = selectedLanguage;
    window.speechSynthesis.speak(utterance);
  };

  return {
    voices,
    selectedVoice,
    selectedLanguage,
    languages,
    setSelectedVoice,
    setSelectedLanguage,
    speak
  };
};