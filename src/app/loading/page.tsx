'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    const generateProgram = async () => {
      try {
        // Get sleep entries from localStorage
        const savedEntries = localStorage.getItem('sleepEntries');
        if (!savedEntries) {
          throw new Error('No sleep data found');
        }

        const entries = JSON.parse(savedEntries);
        
        // Get quiz scores from localStorage
        const quizScores = localStorage.getItem('quizScores') || '[]';
        const scores = JSON.parse(quizScores);

        // Prepare the prompt for OpenAI
        const prompt = `Create a personalized sleep improvement program based on the following data:

Sleep History:
${entries.map((entry: any) => `
- Date: ${entry.date}
- Sleep Duration: ${entry.bedtime} to ${entry.wakeTime}
- Quality: ${entry.quality}/10
- Notes: ${entry.notes}
`).join('\n')}

Quiz Performance:
${scores.length > 0 ? `Average Score: ${scores.reduce((a: number, b: number) => a + b, 0) / scores.length}%` : 'No quiz data available'}

Please provide:
1. A summary of sleep patterns
2. Specific areas for improvement
3. Personalized recommendations
4. A 7-day action plan
5. Tips based on the sleep notes provided`;

        // Call OpenAI API
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate program');
        }

        const data = await response.json();
        
        // Store the generated program
        localStorage.setItem('aiProgram', JSON.stringify(data.program));
        
        // Navigate to the program page
        router.push('/ai-program');
      } catch (error) {
        console.error('Error generating program:', error);
        router.push('/ai-program?error=true');
      }
    };

    generateProgram();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-2">Generating Your Sleep Program</h1>
        <p className="text-gray-300">This may take a few moments...</p>
      </div>
    </div>
  );
} 