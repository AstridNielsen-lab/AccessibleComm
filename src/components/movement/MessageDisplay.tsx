import React from 'react';
import { Volume2 } from 'lucide-react';

interface MessageDisplayProps {
  message: string;
  onSpeak: () => void;
}

export const MessageDisplay: React.FC<MessageDisplayProps> = ({ message, onSpeak }) => {
  return (
    <div className="mb-8">
      <div className="bg-gray-50 p-4 rounded-lg min-h-[100px] mb-4 text-2xl">
        {message || 'Your message will appear here...'}
      </div>
      <button
        onClick={onSpeak}
        disabled={!message}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Volume2 size={20} />
        Speak Message
      </button>
    </div>
  );
};