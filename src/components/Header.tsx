import React from 'react';
import { Timer, Settings, Power } from 'lucide-react';

interface HeaderProps {
  isEnabled: boolean;
  onToggleEnabled: () => void;
}

export function Header({ isEnabled, onToggleEnabled }: HeaderProps) {
  return (
    <div className="bg-white shadow-sm p-4 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Timer className="w-6 h-6 text-indigo-600" />
          <h1 className="text-xl font-semibold">FocusFlow</h1>
        </div>
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
          <button
            onClick={onToggleEnabled}
            className={`p-1.5 rounded-full transition-colors ${
              isEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
            }`}
          >
            <Power className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}