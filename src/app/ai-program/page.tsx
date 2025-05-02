'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AIProgram() {
  const [isLoading, setIsLoading] = useState(false);
  const [program, setProgram] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    // Check for error in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('error')) {
      setError('Failed to generate sleep program. Please try again.');
      return;
    }

    // Try to get the program from localStorage
    const savedProgram = localStorage.getItem('aiProgram');
    if (savedProgram) {
      try {
        const parsedProgram = JSON.parse(savedProgram);
        setProgram(parsedProgram);
      } catch (error) {
        console.error('Error parsing saved program:', error);
        setError('Error loading your sleep program.');
      }
    }
  }, []);

  const generateProgram = async () => {
    setIsLoading(true);
    setError('');
    try {
      router.push('/loading');
    } catch (error) {
      console.error('Error navigating to loading:', error);
      setError('Error starting program generation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">AI Sleep Improvement Program</h1>
          <Link 
            href="/tracker"
            className="text-blue-300 hover:text-blue-200 transition-colors"
          >
            ← Back to Tracker
          </Link>
        </div>

        <div className="bg-white/10 p-8 rounded-lg backdrop-blur-lg shadow-2xl min-h-[60vh] flex flex-col justify-center">
          <div className="flex flex-col items-center space-y-6">
            {error && (
              <div className="w-full p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-center">
                {error}
              </div>
            )}
            
            {program ? (
              <>
                <div className="w-full p-6 bg-white/5 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">Your Personalized Sleep Program</h2>
                  <div className="prose prose-invert max-w-none whitespace-pre-wrap">
                    {program}
                  </div>
                </div>
                <button
                  onClick={generateProgram}
                  disabled={isLoading}
                  className={`px-6 py-4 rounded-full transition-colors ${
                    isLoading 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-purple-500 hover:bg-purple-600'
                  }`}
                >
                  {isLoading ? 'Generating...' : 'Regenerate Sleep Program'}
                </button>
              </>
            ) : (
              <button
                onClick={generateProgram}
                disabled={isLoading}
                className={`px-6 py-4 rounded-full transition-colors ${
                  isLoading 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-purple-500 hover:bg-purple-600'
                }`}
              >
                {isLoading ? 'Generating...' : 'Generate Sleep Program'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 