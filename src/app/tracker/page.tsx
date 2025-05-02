'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
  const [error, setError] = useState<string>('');

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('sleepEntries');
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries);
        if (Array.isArray(parsedEntries)) {
          setEntries(parsedEntries);
        }
      } catch (error) {
        console.error('Error parsing sleep entries:', error);
      }
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('sleepEntries', JSON.stringify(entries));
    }
  }, [entries]);

  const validateTimes = (bedtime: string, wakeTime: string): boolean => {
    if (!bedtime || !wakeTime) return true;
    
    const [bedHour, bedMin] = bedtime.split(':').map(Number);
    const [wakeHour, wakeMin] = wakeTime.split(':').map(Number);
    
    // Convert times to minutes since midnight for easier comparison
    const bedMinutes = bedHour * 60 + bedMin;
    const wakeMinutes = wakeHour * 60 + wakeMin;
    
    // If wake time is before bedtime, it's valid only if it's the next day
    // (e.g., bedtime 23:00, wake time 07:00 is valid)
    if (wakeMinutes <= bedMinutes) {
      // Check if it's a reasonable sleep duration (at least 1 hour, at most 16 hours)
      const sleepDuration = (24 * 60 - bedMinutes) + wakeMinutes;
      return sleepDuration >= 60 && sleepDuration <= 16 * 60;
    }
    
    // For same-day sleep (e.g., 22:00 to 07:00 next day)
    const sameDayDuration = wakeMinutes - bedMinutes;
    return sameDayDuration >= 60 && sameDayDuration <= 16 * 60;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateTimes(formData.bedtime, formData.wakeTime)) {
      setError('Invalid sleep duration. Please ensure wake time is after bedtime and sleep duration is between 1 and 16 hours.');
      return;
    }

    if (formData.notes.length < 100) {
      setError('Please provide at least 100 characters in your notes about your sleep.');
      return;
    }
    
    setError('');
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
    
    // Clear error when user starts typing
    if (name === 'bedtime' || name === 'wakeTime') {
      setError('');
    }
  };

  // Add function to clear all entries
  const clearEntries = () => {
    if (window.confirm('Are you sure you want to clear all sleep entries?')) {
      setEntries([]);
      localStorage.removeItem('sleepEntries');
    }
  };

  // Add function to delete individual entry
  const deleteEntry = (index: number) => {
    if (window.confirm('Are you sure you want to delete this sleep entry?')) {
      const newEntries = entries.filter((_, i) => i !== index);
      setEntries(newEntries);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Sleep Tracker</h1>
          <Link 
            href={entries.length >= 3 ? "/loading" : "#"}
            className={`px-6 py-4 rounded-full transition-colors ${
              entries.length >= 3
                ? 'bg-purple-500 hover:bg-purple-600'
                : 'bg-gray-500 cursor-not-allowed'
            }`}
          >
            {entries.length >= 3 ? 'Get AI Sleep Program' : `Need ${3 - entries.length} more entries`}
          </Link>
        </div>

        <div className="bg-white/10 p-8 rounded-lg backdrop-blur-lg mb-8 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-6">Log Your Sleep</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">
              {error}
            </div>
          )}
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
              <label className="block mb-2">Notes (minimum 100 characters)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white/5 border border-white/20 h-24 resize-none"
                placeholder="How did you sleep? Any factors that affected your sleep? (minimum 100 characters)"
                minLength={100}
                required
              />
              <p className="text-sm text-gray-300 mt-1">
                {formData.notes.length}/100 characters
              </p>
            </div>
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition-colors"
            >
              Log Sleep
            </button>
          </form>
        </div>

        <div className="bg-white/10 p-8 rounded-lg backdrop-blur-lg shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Sleep History</h2>
            {entries.length > 0 && (
              <button
                onClick={clearEntries}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Clear All
              </button>
            )}
          </div>
          {entries.length === 0 ? (
            <p className="text-gray-300">No sleep entries yet. Start logging your sleep above!</p>
          ) : (
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-lg shadow-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-shrink-0">
                      <p className="font-semibold">{entry.date}</p>
                      <p className="text-sm text-gray-300">
                        {entry.bedtime} - {entry.wakeTime}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold">Quality: {entry.quality}/10</p>
                      <button
                        onClick={() => deleteEntry(index)}
                        className="text-red-400 hover:text-red-300 mt-2"
                        title="Delete entry"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  {entry.notes && (
                    <p className="mt-2 text-sm text-gray-300 break-words whitespace-pre-wrap overflow-hidden">{entry.notes}</p>
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