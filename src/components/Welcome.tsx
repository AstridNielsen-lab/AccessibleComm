import React from 'react';
import { Link } from 'react-router-dom';
import { Accessibility, Eye, MessageSquareText } from 'lucide-react';

export const Welcome: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <Accessibility className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to AccessibleComm</h1>
        <p className="text-xl text-gray-600">
          Breaking communication barriers through innovative technology
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <Eye className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Eye Movement Control</h2>
          <p className="text-gray-600 mb-4">
            Communicate through eye movements and facial gestures using our advanced tracking technology
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <MessageSquareText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Libras Translation</h2>
          <p className="text-gray-600 mb-4">
            Real-time translation of Brazilian Sign Language (Libras) into voice
          </p>
        </div>
      </div>

      <div className="space-x-4">
        <Link
          to="/register"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Login
        </Link>
      </div>
    </div>
  );
};