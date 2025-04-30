'use client';

import { useState, useEffect } from 'react';

const questions = [
  {
    id: 1,
    question: "How many hours of sleep does an average adult need per night?",
    options: ["5-6 hours", "6-7 hours", "7-9 hours", "9-10 hours"],
    correct: 2
  },
  {
    id: 2,
    question: "Which of these is NOT good sleep hygiene practice?",
    options: [
      "Having a consistent sleep schedule",
      "Using electronic devices in bed",
      "Keeping the bedroom cool",
      "Regular exercise during the day"
    ],
    correct: 1
  },
  {
    id: 3,
    question: "What is the ideal bedroom temperature for sleep?",
    options: ["60-67°F (15-19°C)", "68-75°F (20-24°C)", "76-82°F (24-28°C)", "Above 82°F (28°C)"],
    correct: 0
  },
  {
    id: 4,
    question: "What is the recommended time to stop consuming caffeine before bedtime?",
    options: ["1 hour before", "3 hours before", "6 hours before", "8 hours before"],
    correct: 2
  },
  {
    id: 5,
    question: "Which of these activities is most beneficial for sleep?",
    options: [
      "Watching TV in bed",
      "Reading a book (not on a screen)",
      "Checking social media",
      "Playing video games"
    ],
    correct: 1
  },
  {
    id: 6,
    question: "What is the recommended duration for a power nap?",
    options: ["10-20 minutes", "30-40 minutes", "1 hour", "2 hours"],
    correct: 0
  },
  {
    id: 7,
    question: "Which of these foods is most likely to help with sleep?",
    options: [
      "Spicy food",
      "Chocolate",
      "Cherries or tart cherry juice",
      "Coffee"
    ],
    correct: 2
  },
  {
    id: 8,
    question: "What is the best position for sleep according to most sleep experts?",
    options: [
      "On your back",
      "On your stomach",
      "On your side",
      "There is no single best position"
    ],
    correct: 3
  },
  {
    id: 9,
    question: "How long should you try to fall asleep before getting out of bed?",
    options: ["5 minutes", "10 minutes", "20 minutes", "30 minutes"],
    correct: 2
  },
  {
    id: 10,
    question: "Which of these is a sign of good sleep quality?",
    options: [
      "Falling asleep immediately when you go to bed",
      "Waking up multiple times during the night",
      "Feeling refreshed in the morning",
      "Having vivid dreams every night"
    ],
    correct: 2
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const getFeedbackMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return "Outstanding! You're a sleep expert! 🌟";
    if (percentage >= 70) return "Great job! You know your sleep hygiene! 💪";
    if (percentage >= 50) return "Good effort! Keep learning about sleep! 📚";
    return "Keep studying! Sleep hygiene is important! 🌙";
  };

  const handleAnswerClick = (selectedOption: number) => {
    setSelectedOption(selectedOption);
    const correct = selectedOption === questions[currentQuestion].correct;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);
      setIsCorrect(null);

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowFeedback(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {showScore ? (
          <div className="bg-white/10 p-8 rounded-lg backdrop-blur-lg text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Quiz Complete! 🎉</h2>
            <p className="text-xl mb-6">You scored {score} out of {questions.length}</p>
            <p className="text-lg mb-8 text-purple-300">{getFeedbackMessage(score, questions.length)}</p>
            <button
              onClick={handleRestart}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition-colors transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="bg-white/10 p-8 rounded-lg backdrop-blur-lg">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm">Question {currentQuestion + 1} of {questions.length}</p>
                <div className="w-32 h-2 bg-white/20 rounded-full">
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>
              <h2 className="text-2xl font-semibold">{questions[currentQuestion].question}</h2>
            </div>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 transform hover:scale-105
                    ${selectedOption === index 
                      ? isCorrect 
                        ? 'bg-green-500' 
                        : 'bg-red-500'
                      : 'bg-white/5 hover:bg-purple-500'
                    }
                    ${selectedOption !== null && selectedOption !== index ? 'opacity-50' : ''}
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
            {showFeedback && (
              <div className={`mt-4 text-center text-lg font-semibold animate-bounce
                ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? 'Correct! 🎉' : 'Try again! 💪'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 