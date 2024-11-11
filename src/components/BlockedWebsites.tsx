import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';

interface BlockedWebsite {
  url: string;
  reason: string;
}

interface BlockedWebsitesProps {
  websites: BlockedWebsite[];
  onAdd: (website: BlockedWebsite) => void;
  onRemove: (url: string) => void;
}

export function BlockedWebsites({ websites, onAdd, onRemove }: BlockedWebsitesProps) {
  const [newUrl, setNewUrl] = useState('');
  const [newReason, setNewReason] = useState('');

  const handleAdd = () => {
    if (newUrl && newReason) {
      onAdd({ url: newUrl, reason: newReason });
      setNewUrl('');
      setNewReason('');
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <Lock className="w-5 h-5 text-indigo-600" />
        <h2 className="font-medium">Blocked Websites</h2>
      </div>
      
      <div className="space-y-2 mb-4">
        {websites.map((site, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-2 text-sm">
            <div>
              <span className="font-medium">{site.url}</span>
              <span className="text-gray-500 ml-2">({site.reason})</span>
            </div>
            <button
              onClick={() => onRemove(site.url)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Website URL"
          className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Reason"
          className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={newReason}
          onChange={(e) => setNewReason(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}