import React from 'react';
import { Send } from 'lucide-react';

interface ChatMessage {
  sender: string;
  message: string;
}

interface ChatInterfaceProps {
  chatInput: string;
  chatMessages: ChatMessage[];
  onChatInputChange: (value: string) => void;
  onSendMessage: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  chatInput,
  chatMessages,
  onChatInputChange,
  onSendMessage,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mt-6">
      <h2 className="text-lg font-semibold mb-2">Chat with Gemini</h2>
      <div className="max-h-64 overflow-y-auto bg-white rounded-lg shadow-inner p-4 mb-4">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender === 'User' ? 'text-right text-blue-500' : 'text-left text-gray-700'
            }`}
          >
            <p>
              <strong>{msg.sender}:</strong> {msg.message}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => onChatInputChange(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 py-2 px-3 border border-gray-300 rounded-lg"
        />
        <button
          onClick={onSendMessage}
          className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};