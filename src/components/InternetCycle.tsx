import React from 'react';
import { Clock } from 'lucide-react';
import { Toggle } from './Toggle';

interface InternetCycleProps {
  enabled: boolean;
  onToggle: () => void;
  workDuration: number;
  breakDuration: number;
  onWorkDurationChange: (duration: number) => void;
  onBreakDurationChange: (duration: number) => void;
  nextBreakTime: string;
}

export function InternetCycle({
  enabled,
  onToggle,
  workDuration,
  breakDuration,
  onWorkDurationChange,
  onBreakDurationChange,
  nextBreakTime,
}: InternetCycleProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-600" />
          <h2 className="font-medium">Internet Cycle</h2>
        </div>
        <Toggle enabled={enabled} onToggle={onToggle} />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={workDuration}
            onChange={(e) => onWorkDurationChange(parseInt(e.target.value))}
            className="w-16 px-2 py-1 rounded border text-sm"
            min="1"
          />
          <span className="text-sm text-gray-600">minutes work</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={breakDuration}
            onChange={(e) => onBreakDurationChange(parseInt(e.target.value))}
            className="w-16 px-2 py-1 rounded border text-sm"
            min="1"
          />
          <span className="text-sm text-gray-600">minutes break</span>
        </div>
      </div>

      {enabled && (
        <div className="bg-indigo-50 rounded-lg p-3 text-sm mt-3">
          <div className="flex items-center justify-between text-indigo-700">
            <span>Next break in:</span>
            <span className="font-semibold">{nextBreakTime}</span>
          </div>
        </div>
      )}
    </div>
  );
}