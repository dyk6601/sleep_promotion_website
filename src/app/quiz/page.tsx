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

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

interface QuizSet {
  title: string;
  description: string;
  questions: Question[];
}

type QuizSets = {
  [key: string]: QuizSet;
};

const quizSets: QuizSets = {
  quiz1: {
    title: "Sleep Basics",
    description: "Test your knowledge about fundamental sleep concepts",
    questions: questions
  },
  quiz2: {
    title: "Sleep Disorders",
    description: "Learn about common sleep disorders and their symptoms",
    questions: questions
  },
  quiz3: {
    title: "Sleep Hygiene",
    description: "Test your knowledge about good sleep practices",
    questions: questions
  }
};

export default function Quiz() {
  const [currentQuiz, setCurrentQuiz] = useState<keyof QuizSets>('quiz1');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [highScores, setHighScores] = useState<Record<string, number>>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('quizHighScores');
    if (saved) {
      setHighScores(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('quizHighScores', JSON.stringify(highScores));
    }
  }, [highScores, isClient]);

  const getFeedbackMessage = (score: number, total: number, points: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return `Sleep Master! 🌟 You've earned ${points} points! Keep shining!`;
    if (percentage >= 70) return `Sleep Champion! 💪 You've earned ${points} points! Amazing work!`;
    if (percentage >= 50) return `Sleep Explorer! 📚 You've earned ${points} points! Keep learning!`;
    return `Sleep Adventurer! 🌙 You've earned ${points} points! Every step counts!`;
  };

  const handleAnswerClick = (selectedOption: number) => {
    setSelectedOption(selectedOption);
    const correct = selectedOption === quizSets[currentQuiz].questions[currentQuestion].correct;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
      setPoints(points + 100);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);
      setIsCorrect(null);

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizSets[currentQuiz].questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        const percentage = (score + (correct ? 1 : 0)) / quizSets[currentQuiz].questions.length * 100;
        if (percentage >= 70) {
          setIsCelebrating(true);
        }
        const finalPoints = points + (correct ? 100 : 0);
        if (!highScores[currentQuiz] || finalPoints > highScores[currentQuiz]) {
          setHighScores(prev => ({
            ...prev,
            [currentQuiz]: finalPoints
          }));
        }
        setShowScore(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setPoints(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setIsCelebrating(false);
  };

  const handleQuizChange = (quizId: string) => {
    setCurrentQuiz(quizId as keyof QuizSets);
    handleRestart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {showScore ? (
          <div className={`bg-white/10 p-8 rounded-lg backdrop-blur-lg text-center animate-fade-in shadow-2xl ${isCelebrating ? 'animate-bounce' : ''}`}>
            <h2 className="text-3xl font-bold mb-4">Quiz Complete! 🎉</h2>
            <p className="text-xl mb-2">You scored {score} out of {quizSets[currentQuiz].questions.length}</p>
            <p className="text-2xl font-bold mb-6 text-yellow-400">Total Points: {points} ⭐</p>
            {highScores[currentQuiz] && (
              <p className="text-lg mb-4 text-purple-300">
                High Score: {highScores[currentQuiz]} points
              </p>
            )}
            <p className="text-lg mb-8 text-purple-300">{getFeedbackMessage(score, quizSets[currentQuiz].questions.length, points)}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRestart}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition-colors transform hover:scale-105"
              >
                Take Another Shot! 🎯
              </button>
              <button
                onClick={() => setShowScore(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors transform hover:scale-105"
              >
                Try Another Quiz! 🔄
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 p-8 rounded-lg backdrop-blur-lg shadow-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{quizSets[currentQuiz].title}</h1>
              <p className="text-gray-300 mb-4">{quizSets[currentQuiz].description}</p>
              <div className="flex gap-4 mb-6">
                {Object.entries(quizSets).map(([id, quiz]) => (
                  <button
                    key={id}
                    onClick={() => handleQuizChange(id)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      currentQuiz === id
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {quiz.title}
                    {isClient && highScores[id] && (
                      <span className="ml-2 text-yellow-400">⭐ {highScores[id]}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <div className="text-xl font-bold text-yellow-400">
                Points: {points} ⭐
              </div>
              <div className="text-sm">
                Question {currentQuestion + 1} of {quizSets[currentQuiz].questions.length}
              </div>
            </div>
            <div className="mb-8">
              <div className="w-full h-2 bg-white/20 rounded-full">
                <div 
                  className="h-full bg-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / quizSets[currentQuiz].questions.length) * 100}%` }}
                />
              </div>
              <h2 className="text-2xl font-semibold mt-4">{quizSets[currentQuiz].questions[currentQuestion].question}</h2>
            </div>
            <div className="space-y-4">
              {quizSets[currentQuiz].questions[currentQuestion].options.map((option, index) => (
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
                {isCorrect 
                  ? `Perfect! +100 points! 🌟` 
                  : `Almost there! Keep going! 💪`}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 