import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, MessageSquareText } from 'lucide-react';

export const ModeSelect: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Choose Your Communication Mode</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <button
          onClick={() => navigate('/movement')}
          className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Eye className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-4">Eye Movement Control</h3>
          <p className="text-gray-600">
            Use eye movements and facial gestures to communicate
          </p>
        </button>

        <button
          onClick={() => navigate('/libras')}
          className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <MessageSquareText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-4">Libras Translation</h3>
          <p className="text-gray-600">
            Communicate using Brazilian Sign Language
          </p>
        </button>
      </div>
    </div>
  );
};