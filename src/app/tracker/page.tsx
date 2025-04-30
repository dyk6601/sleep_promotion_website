'use client';

import { useState } from 'react';

interface SleepEntry {
  date: string;
  bedtime: string;
  wakeTime: string;
  quality: number;
  notes: string;
}

export default function Tracker() {
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [formData, setFormData] = useState<SleepEntry>({
    date: new Date().toISOString().split('T')[0],
    bedtime: '',
    wakeTime: '',
    quality: 5,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEntries([formData, ...entries]);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      bedtime: '',
      wakeTime: '',
      quality: 5,
      notes: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-12">Sleep Tracker</h1>

        <div className="bg-white/10 p-8 rounded-lg backdrop-blur-lg mb-8">
          <h2 className="text-2xl font-semibold mb-6">Log Your Sleep</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white/5 border border-white/20"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Bedtime</label>
                <input
                  type="time"
                  name="bedtime"
                  value={formData.bedtime}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white/5 border border-white/20"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Wake Time</label>
                <input
                  type="time"
                  name="wakeTime"
                  value={formData.wakeTime}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white/5 border border-white/20"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Sleep Quality (1-10)</label>
                <input
                  type="number"
                  name="quality"
                  min="1"
                  max="10"
                  value={formData.quality}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white/5 border border-white/20"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block mb-2">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white/5 border border-white/20 h-24"
                placeholder="How did you sleep? Any factors that affected your sleep?"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition-colors"
            >
              Log Sleep
            </button>
          </form>
        </div>

        <div className="bg-white/10 p-8 rounded-lg backdrop-blur-lg">
          <h2 className="text-2xl font-semibold mb-6">Sleep History</h2>
          {entries.length === 0 ? (
            <p className="text-gray-300">No sleep entries yet. Start logging your sleep above!</p>
          ) : (
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{entry.date}</p>
                      <p className="text-sm text-gray-300">
                        {entry.bedtime} - {entry.wakeTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">Quality: {entry.quality}/10</p>
                    </div>
                  </div>
                  {entry.notes && (
                    <p className="mt-2 text-sm text-gray-300">{entry.notes}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 