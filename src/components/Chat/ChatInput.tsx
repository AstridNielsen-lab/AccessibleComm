import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { VirtualKeyboard } from '../keyboard/VirtualKeyboard';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleLetterSelect = (key: string) => {
    if (key === 'BACKSPACE') {
      setMessage(prev => prev.slice(0, -1));
    } else {
      setMessage(prev => prev + key);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      
      <VirtualKeyboard onLetterSelect={handleLetterSelect} />
    </div>
  );
};