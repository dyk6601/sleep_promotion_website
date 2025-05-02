'use client';

import { useState, useEffect } from 'react';

const sleepBasicsQuestions = [
  {
    id: 1,
    question: "How many hours of sleep does an average adult need per night?",
    options: ["5-6 hours", "6-7 hours", "7-9 hours", "9-10 hours"],
    correct: 2
  },
  {
    id: 2,
    question: "What is the ideal bedroom temperature for sleep?",
    options: ["60-67°F (15-19°C)", "68-75°F (20-24°C)", "76-82°F (24-28°C)", "Above 82°F (28°C)"],
    correct: 0
  },
  {
    id: 3,
    question: "What is the recommended duration for a power nap?",
    options: ["10-20 minutes", "30-40 minutes", "1 hour", "2 hours"],
    correct: 0
  },
  {
    id: 4,
    question: "What is the best position for sleep according to most sleep experts?",
    options: ["On your back", "On your stomach", "On your side", "There is no single best position"],
    correct: 3
  },
  {
    id: 5,
    question: "How long should you try to fall asleep before getting out of bed?",
    options: ["5 minutes", "10 minutes", "20 minutes", "30 minutes"],
    correct: 2
  }
];

const sleepHygieneQuestions = [
  {
    id: 1,
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
    id: 2,
    question: "What is the recommended time to stop consuming caffeine before bedtime?",
    options: ["1 hour before", "3 hours before", "6 hours before", "8 hours before"],
    correct: 2
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
    question: "Which of these is a sign of good sleep quality?",
    options: [
      "Falling asleep immediately when you go to bed",
      "Waking up multiple times during the night",
      "Feeling refreshed in the morning",
      "Having vivid dreams every night"
    ],
    correct: 2
  },
  {
    id: 6,
    question: "How does alcohol typically affect sleep?",
    options: [
      "Improves deep sleep throughout the night",
      "Helps you stay asleep all night",
      "Disrupts sleep cycles and reduces sleep quality",
      "Has no effect on sleep"
    ],
    correct: 2
  },
  {
    id: 7,
    question: "What is a common effect of marijuana (MJ) on sleep?",
    options: [
      "Increases REM sleep",
      "Reduces REM sleep and may affect sleep quality",
      "No effect on sleep",
      "Always improves sleep quality"
    ],
    correct: 1
  },
  {
    id: 8,
    question: "How does tobacco/nicotine use affect sleep?",
    options: [
      "Improves sleep onset",
      "No effect on sleep",
      "Can cause insomnia and disrupt sleep",
      "Always helps you sleep longer"
    ],
    correct: 2
  },
  {
    id: 9,
    question: "What is melatonin most effective for?",
    options: [
      "Helping you stay asleep all night",
      "Adjusting your sleep timing (chronotype) and sleep onset",
      "Increasing deep sleep",
      "Preventing nightmares"
    ],
    correct: 1
  },
  {
    id: 10,
    question: "Which of the following is a benefit of napping?",
    options: [
      "Improved alertness and performance",
      "Worse memory",
      "Increased insomnia",
      "None of the above"
    ],
    correct: 0
  },
  {
    id: 11,
    question: "What is the best time of day for a nap to avoid interfering with nighttime sleep?",
    options: [
      "Early afternoon",
      "Late evening",
      "Right before bed",
      "Midnight"
    ],
    correct: 0
  },
  {
    id: 12,
    question: "What is strategic napping?",
    options: [
      "Napping for long periods whenever you feel tired",
      "Taking short naps (10-20 minutes) to boost alertness without grogginess",
      "Napping only at night",
      "Napping after drinking alcohol"
    ],
    correct: 1
  },
  {
    id: 13,
    question: "Which bedtime snack is most likely to help with sleep?",
    options: [
      "A large spicy meal",
      "A small snack with complex carbs and protein",
      "Sugary candy",
      "Energy drink"
    ],
    correct: 1
  }
];

const sleepDisordersQuestions = [
  {
    id: 1,
    question: "Which disorder is characterized by difficulty falling or staying asleep?",
    options: ["Insomnia", "Sleep apnea", "Narcolepsy", "Restless legs syndrome"],
    correct: 0
  },
  {
    id: 2,
    question: "Which disorder involves pauses in breathing during sleep?",
    options: ["Insomnia", "Sleep apnea", "Narcolepsy", "Restless legs syndrome"],
    correct: 1
  },
  {
    id: 3,
    question: "Which disorder is marked by sudden sleep attacks during the day?",
    options: ["Insomnia", "Sleep apnea", "Narcolepsy", "Restless legs syndrome"],
    correct: 2
  },
  {
    id: 4,
    question: "Which disorder is associated with uncomfortable sensations in the legs and an urge to move them?",
    options: ["Insomnia", "Sleep apnea", "Narcolepsy", "Restless legs syndrome"],
    correct: 3
  },
  {
    id: 5,
    question: "Which of the following is a common symptom of sleep apnea?",
    options: ["Loud snoring", "Night sweats", "Sleepwalking", "Nightmares"],
    correct: 0
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
    questions: sleepBasicsQuestions
  },
  quiz2: {
    title: "Sleep Disorders",
    description: "Learn about common sleep disorders and their symptoms",
    questions: sleepDisordersQuestions
  },
  quiz3: {
    title: "Sleep Hygiene",
    description: "Test your knowledge about good sleep practices",
    questions: sleepHygieneQuestions
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
  const [timer, setTimer] = useState(30);
  const [streak, setStreak] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [perks, setPerks] = useState<string[]>([]);
  const [availablePerks, setAvailablePerks] = useState<string[]>(['Speed Boost', 'Double Points', 'Extra Time']);

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

  useEffect(() => {
    if (!showScore && selectedOption === null) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showScore, selectedOption]);

  useEffect(() => {
    if (isCelebrating) {
      const timeout = setTimeout(() => setIsCelebrating(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isCelebrating]);

  const getFeedbackMessage = (score: number, total: number, points: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return `Sleep Master! 🌟 You've earned ${points} points! Keep shining!`;
    if (percentage >= 70) return `Sleep Champion! 💪 You've earned ${points} points! Amazing work!`;
    if (percentage >= 50) return `Sleep Explorer! 📚 You've earned ${points} points! Keep learning!`;
    return `Sleep Adventurer! 🌙 You've earned ${points} points! Every step counts!`;
  };

  const awardPerks = (currentStreak: number) => {
    const newPerks: string[] = [];
    if (currentStreak >= 3) newPerks.push('Speed Boost');
    if (currentStreak >= 5) newPerks.push('Double Points');
    if (currentStreak >= 7) newPerks.push('Extra Time');
    setPerks(newPerks);
  };

  const usePerk = (perk: string) => {
    setAvailablePerks(availablePerks.filter(p => p !== perk));
    if (perk === 'Speed Boost') {
      setTimer(timer + 10);
    } else if (perk === 'Double Points') {
      setPoints(points * 2);
    } else if (perk === 'Extra Time') {
      setTimer(timer + 20);
    }
  };

  const handleAnswerClick = (selectedOption: number) => {
    setSelectedOption(selectedOption);
    const correct = selectedOption === quizSets[currentQuiz].questions[currentQuestion].correct;
    setIsCorrect(correct);
    setShowFeedback(true);
    setIsAnimating(true);

    if (correct) {
      setScore(score + 1);
      setPoints(points + 100);
      setStreak(streak + 1);
      awardPerks(streak + 1);
    } else {
      setStreak(0);
      setPerks([]);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);
      setIsCorrect(null);
      setIsAnimating(false);
      setTimer(30);

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
              <div className="text-sm">
                Timer: {timer}s
              </div>
              <div className="text-sm">
                Streak: {streak} 🔥
              </div>
            </div>
            <div className="flex gap-4 justify-center mb-4">
              {availablePerks.map((perk) => (
                <button
                  key={perk}
                  onClick={() => usePerk(perk)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors transform hover:scale-105"
                >
                  Use {perk}
                </button>
              ))}
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
                    ${isAnimating ? 'animate-pulse' : ''}
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