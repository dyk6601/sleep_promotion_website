'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [hasEnoughEntries, setHasEnoughEntries] = useState(false);

  useEffect(() => {
    const savedEntries = localStorage.getItem('sleepEntries');
    if (savedEntries) {
      try {
        const entries = JSON.parse(savedEntries);
        setHasEnoughEntries(Array.isArray(entries) && entries.length >= 3);
      } catch (error) {
        console.error('Error parsing sleep entries:', error);
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-8">
          Sleep Better, Live Better
        </h1>
        <p className="text-xl text-center mb-12">
          Learn the science of sleep and develop healthy sleep habits through interactive exercises
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-4">Sleep Quiz</h2>
            <p className="mb-4">Test your knowledge about sleep hygiene and learn new facts!</p>
            <div className="mt-auto">
              <Link href="/quiz" className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition-colors">
                Take Quiz
              </Link>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-4">Sleep Tips</h2>
            <p className="mb-4">Discover practical tips for better sleep quality.</p>
            <div className="mt-auto">
              <Link href="/tips" className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition-colors">
                Learn More
              </Link>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-4">Sleep Tracker</h2>
            <p className="mb-4">Monitor your sleep patterns and improve your habits.</p>
            <div className="mt-auto">
              <Link href="/tracker" className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition-colors">
                Start Tracking
              </Link>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-4">AI Sleep Program</h2>
            <p className="mb-4">Get personalized sleep improvement recommendations based on your sleep data.</p>
            <div className="mt-auto">
              <Link 
                href={hasEnoughEntries ? "/loading" : "#"}
                className={`inline-block px-6 py-2 rounded-full transition-colors ${
                  hasEnoughEntries
                    ? 'bg-purple-500 hover:bg-purple-600 text-white'
                    : 'bg-gray-500 cursor-not-allowed text-gray-300'
                }`}
              >
                {hasEnoughEntries ? 'Generate Program' : 'Need 3+ Sleep Tracker Entries'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
