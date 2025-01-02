import { SpeechOptions } from '../types';

export const speak = (text: string, options: SpeechOptions = {}) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = options.lang || 'pt-BR';
  utterance.rate = options.rate || 1;
  utterance.pitch = options.pitch || 1;
  utterance.volume = options.volume || 1;
  window.speechSynthesis.speak(utterance);
};

export const cancelSpeech = () => {
  window.speechSynthesis.cancel();
};