import React from 'react';
import { BarChart2 } from 'lucide-react';

interface DailyStats {
  date: string;
  timeSpent: number;
  blockedAttempts: number;
}

interface AnalyticsProps {
  stats: DailyStats[];
}

export function Analytics({ stats }: AnalyticsProps) {
  const totalTimeToday = stats[stats.length - 1]?.timeSpent || 0;
  const blockedToday = stats[stats.length - 1]?.blockedAttempts || 0;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <BarChart2 className="w-5 h-5 text-indigo-600" />
        <h2 className="font-medium">Analytics</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-indigo-50 rounded-lg p-3">
          <div className="text-sm text-indigo-600">Time Today</div>
          <div className="text-xl font-semibold text-indigo-700">
            {Math.round(totalTimeToday / 60)}h {totalTimeToday % 60}m
          </div>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <div className="text-sm text-red-600">Blocked Attempts</div>
          <div className="text-xl font-semibold text-red-700">{blockedToday}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Last 7 Days</div>
        <div className="h-32 flex items-end gap-2">
          {stats.slice(-7).map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-indigo-200 rounded-t"
                style={{ height: `${(day.timeSpent / (8 * 60)) * 100}%` }}
              ></div>
              <div className="text-xs text-gray-500 mt-1">
                {day.date.slice(5)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}