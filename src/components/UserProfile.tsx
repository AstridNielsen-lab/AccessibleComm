import React from 'react';
import { User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const UserProfile: React.FC = () => {
  const user = useAuthStore(state => state.user);

  if (!user) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
      <User className="w-5 h-5 text-blue-600" />
      <span className="font-medium text-blue-900">{user.name}</span>
    </div>
  );
};