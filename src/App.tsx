import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InternetCycle } from './components/InternetCycle';
import { Analytics } from './components/Analytics';
import { BlockedWebsites } from './components/BlockedWebsites';
import { Focus, Globe } from 'lucide-react';
import { Toggle } from './components/Toggle';

interface TimedWebsite {
  url: string;
  timeLimit: number;
  timeUsed: number;
}

interface BlockedWebsite {
  url: string;
  reason: string;
}

function App() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [cycleEnabled, setCycleEnabled] = useState(false);
  const [workDuration, setWorkDuration] = useState(40);
  const [breakDuration, setBreakDuration] = useState(20);
  const [focusModeEnabled, setFocusModeEnabled] = useState(false);
  const [nextBreakTime, setNextBreakTime] = useState('23:45');
  const [quickBreakEnabled, setQuickBreakEnabled] = useState(false);
  
  const [timedWebsites, setTimedWebsites] = useState<TimedWebsite[]>([
    { url: 'youtube.com', timeLimit: 30, timeUsed: 15 },
    { url: 'facebook.com', timeLimit: 20, timeUsed: 5 },
  ]);
  
  const [blockedWebsites, setBlockedWebsites] = useState<BlockedWebsite[]>([
    { url: 'tiktok.com', reason: 'Social Media' },
    { url: 'instagram.com', reason: 'Social Media' },
  ]);

  const [stats] = useState([
    { date: '2024-03-01', timeSpent: 320, blockedAttempts: 15 },
    { date: '2024-03-02', timeSpent: 280, blockedAttempts: 12 },
    { date: '2024-03-03', timeSpent: 350, blockedAttempts: 18 },
    { date: '2024-03-04', timeSpent: 240, blockedAttempts: 8 },
    { date: '2024-03-05', timeSpent: 390, blockedAttempts: 22 },
    { date: '2024-03-06', timeSpent: 310, blockedAttempts: 16 },
    { date: '2024-03-07', timeSpent: 270, blockedAttempts: 14 },
  ]);

  const [newWebsite, setNewWebsite] = useState('');
  const [newTimeLimit, setNewTimeLimit] = useState('30');

  useEffect(() => {
    if (quickBreakEnabled) {
      const interval = setInterval(() => {
        // Simulate 1-minute break every 30 minutes
        setQuickBreakEnabled(true);
        setTimeout(() => setQuickBreakEnabled(false), 60000);
      }, 1800000);
      return () => clearInterval(interval);
    }
  }, [quickBreakEnabled]);

  const addTimedWebsite = () => {
    if (newWebsite && newTimeLimit) {
      setTimedWebsites([
        ...timedWebsites,
        { url: newWebsite, timeLimit: parseInt(newTimeLimit), timeUsed: 0 },
      ]);
      setNewWebsite('');
      setNewTimeLimit('30');
    }
  };

  const addBlockedWebsite = (website: BlockedWebsite) => {
    setBlockedWebsites([...blockedWebsites, website]);
  };

  const removeBlockedWebsite = (url: string) => {
    setBlockedWebsites(blockedWebsites.filter(site => site.url !== url));
  };

  if (!isEnabled) {
    return (
      <div className="w-[400px] min-h-[600px] bg-gradient-to-br from-gray-50 to-white text-gray-800">
        <Header isEnabled={isEnabled} onToggleEnabled={() => setIsEnabled(true)} />
        <div className="flex items-center justify-center h-[calc(100%-4rem)]">
          <p className="text-gray-500">Extension is disabled</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[400px] min-h-[600px] bg-gradient-to-br from-indigo-50 to-white text-gray-800">
      <Header isEnabled={isEnabled} onToggleEnabled={() => setIsEnabled(false)} />

      <div className="p-4 space-y-6">
        <InternetCycle
          enabled={cycleEnabled}
          onToggle={() => setCycleEnabled(!cycleEnabled)}
          workDuration={workDuration}
          breakDuration={breakDuration}
          onWorkDurationChange={setWorkDuration}
          onBreakDurationChange={setBreakDuration}
          nextBreakTime={nextBreakTime}
        />

        <Analytics stats={stats} />

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Focus className="w-5 h-5 text-indigo-600" />
              <h2 className="font-medium">Focus Mode</h2>
            </div>
            <Toggle enabled={focusModeEnabled} onToggle={() => setFocusModeEnabled(!focusModeEnabled)} />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
            <span>1-minute break every 30 minutes</span>
            <Toggle enabled={quickBreakEnabled} onToggle={() => setQuickBreakEnabled(!quickBreakEnabled)} />
          </div>
        </div>

        <BlockedWebsites
          websites={blockedWebsites}
          onAdd={addBlockedWebsite}
          onRemove={removeBlockedWebsite}
        />

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-indigo-600" />
            <h2 className="font-medium">Timed Websites</h2>
          </div>
          
          <div className="space-y-2 mb-4">
            {timedWebsites.map((site, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-2 text-sm">
                <span>{site.url}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${(site.timeUsed / site.timeLimit) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-600 w-16 text-right">
                    {site.timeUsed}/{site.timeLimit}m
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Website URL"
              className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newWebsite}
              onChange={(e) => setNewWebsite(e.target.value)}
            />
            <input
              type="number"
              placeholder="Minutes"
              className="w-20 px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newTimeLimit}
              onChange={(e) => setNewTimeLimit(e.target.value)}
            />
            <button
              onClick={addTimedWebsite}
              className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;