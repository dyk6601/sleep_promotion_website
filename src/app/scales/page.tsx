'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ScaleResult {
  name: string;
  score: number;
  interpretation: string;
}

const epworthQuestions = [
  "Sitting and reading",
  "Watching TV",
  "Sitting inactive in a public place (e.g., a theater or a meeting)",
  "As a passenger in a car for an hour without a break",
  "Lying down to rest in the afternoon when circumstances permit",
  "Sitting and talking to someone",
  "Sitting quietly after a lunch without alcohol",
  "In a car, while stopped for a few minutes in traffic"
];

const meqQuestions = [
  {
    question: "Approximately what time would you get up if you were entirely free to plan your day?",
    options: [
      { text: "5:00 AM–6:30 AM", score: 5 },
      { text: "6:30 AM–7:45 AM", score: 4 },
      { text: "7:45 AM–9:45 AM", score: 3 },
      { text: "9:45 AM–11:00 AM", score: 2 },
      { text: "11:00 AM–12 noon", score: 1 }
    ]
  },
  {
    question: "Approximately what time would you go to bed if you were entirely free to plan your evening?",
    options: [
      { text: "8:00 PM–9:00 PM", score: 5 },
      { text: "9:00 PM–10:15 PM", score: 4 },
      { text: "10:15 PM–12:30 AM", score: 3 },
      { text: "12:30 AM–1:45 AM", score: 2 },
      { text: "1:45 AM–3:00 AM", score: 1 }
    ]
  },
  {
    question: "If you usually have to get up at a specific time in the morning, how much do you depend on an alarm clock?",
    options: [
      { text: "Not at all", score: 4 },
      { text: "Slightly", score: 3 },
      { text: "Somewhat", score: 2 },
      { text: "Very much", score: 1 }
    ]
  },
  {
    question: "How easy do you find it to get up in the morning (when you are not awakened unexpectedly)?",
    options: [
      { text: "Very difficult", score: 1 },
      { text: "Somewhat difficult", score: 2 },
      { text: "Fairly easy", score: 3 },
      { text: "Very easy", score: 4 }
    ]
  },
  {
    question: "How alert do you feel during the first half hour after you wake up in the morning?",
    options: [
      { text: "Not at all alert", score: 1 },
      { text: "Slightly alert", score: 2 },
      { text: "Fairly alert", score: 3 },
      { text: "Very alert", score: 4 }
    ]
  },
  {
    question: "How hungry do you feel during the first half hour after you wake up?",
    options: [
      { text: "Not at all hungry", score: 1 },
      { text: "Slightly hungry", score: 2 },
      { text: "Fairly hungry", score: 3 },
      { text: "Very hungry", score: 4 }
    ]
  },
  {
    question: "During the first half hour after you wake up in the morning, how do you feel?",
    options: [
      { text: "Very tired", score: 1 },
      { text: "Fairly tired", score: 2 },
      { text: "Fairly refreshed", score: 3 },
      { text: "Very refreshed", score: 4 }
    ]
  },
  {
    question: "If you had no commitments the next day, what time would you go to bed compared to your usual bedtime?",
    options: [
      { text: "Seldom or never later", score: 4 },
      { text: "Less than 1 hour later", score: 3 },
      { text: "1-2 hours later", score: 2 },
      { text: "More than 2 hours later", score: 1 }
    ]
  },
  {
    question: "You have decided to do physical exercise. A friend suggests that you do this for one hour twice a week, and the best time for him is between 7-8 AM. Bearing in mind nothing but your own internal 'clock,' how do you think you would perform?",
    options: [
      { text: "Would be in good form", score: 4 },
      { text: "Would be in reasonable form", score: 3 },
      { text: "Would find it difficult", score: 2 },
      { text: "Would find it very difficult", score: 1 }
    ]
  },
  {
    question: "At approximately what time in the evening do you feel tired, and, as a result, in need of sleep?",
    options: [
      { text: "8:00 PM–9:00 PM", score: 5 },
      { text: "9:00 PM–10:15 PM", score: 4 },
      { text: "10:15 PM–12:45 AM", score: 3 },
      { text: "12:45 AM–2:00 AM", score: 2 },
      { text: "2:00 AM–3:00 AM", score: 1 }
    ]
  },
  {
    question: "You want to be at your peak performance for a test that you know is going to be mentally exhausting and will last two hours. You are entirely free to plan your day. Considering only your 'internal clock,' which one of the four testing times would you choose?",
    options: [
      { text: "8 AM–10 AM", score: 6 },
      { text: "11 AM–1 PM", score: 4 },
      { text: "3 PM–5 PM", score: 2 },
      { text: "7 PM–9 PM", score: 0 }
    ]
  },
  {
    question: "If you got into bed at 11 PM, how tired would you be?",
    options: [
      { text: "Not at all tired", score: 0 },
      { text: "A little tired", score: 2 },
      { text: "Fairly tired", score: 3 },
      { text: "Very tired", score: 5 }
    ]
  },
  {
    question: "For some reason you have gone to bed several hours later than usual, but there is no need to get up at any particular time the next morning. Which one of the following are you most likely to do?",
    options: [
      { text: "Will wake up at usual time, but will not fall back asleep", score: 4 },
      { text: "Will wake up at usual time and will doze thereafter", score: 3 },
      { text: "Will wake up at usual time, but will fall asleep again", score: 2 },
      { text: "Will not wake up until later than usual", score: 1 }
    ]
  },
  {
    question: "One night you have to remain awake between 4-6 AM in order to carry out a night watch. You have no time commitments the next day. Which one of the alternatives would suit you best?",
    options: [
      { text: "Would not go to bed until the watch is over", score: 1 },
      { text: "Would take a nap before and sleep after", score: 2 },
      { text: "Would take a good sleep before and nap after", score: 3 },
      { text: "Would sleep only before the watch", score: 4 }
    ]
  },
  {
    question: "You have two hours of hard physical work. You are entirely free to plan your day. Considering only your internal 'clock,' which of the following times would you choose?",
    options: [
      { text: "8 AM–10 AM", score: 4 },
      { text: "11 AM–1 PM", score: 3 },
      { text: "3 PM–5 PM", score: 2 },
      { text: "7 PM–9 PM", score: 1 }
    ]
  },
  {
    question: "You have decided to do physical exercise. A friend suggests that you do this for one hour twice a week. The best time for her is between 10-11 PM. Bearing in mind only your internal 'clock,' how well do you think you would perform?",
    options: [
      { text: "Would be in good form", score: 1 },
      { text: "Would be in reasonable form", score: 2 },
      { text: "Would find it difficult", score: 3 },
      { text: "Would find it very difficult", score: 4 }
    ]
  },
  {
    question: "Suppose you can choose your own work hours. Assume that you work a five-hour day (including breaks), your job is interesting, and you are paid based on your performance. At approximately what time would you choose to begin?",
    options: [
      { text: "5 hours starting between 4–8 AM", score: 5 },
      { text: "5 hours starting between 8–9 AM", score: 4 },
      { text: "5 hours starting between 9 AM–2 PM", score: 3 },
      { text: "5 hours starting between 2–5 PM", score: 2 },
      { text: "5 hours starting between 5 PM–4 AM", score: 1 }
    ]
  },
  {
    question: "At approximately what time of day do you usually feel your best?",
    options: [
      { text: "5–8 AM", score: 5 },
      { text: "8–10 AM", score: 4 },
      { text: "10 AM–5 PM", score: 3 },
      { text: "5–10 PM", score: 2 },
      { text: "10 PM–5 AM", score: 1 }
    ]
  },
  {
    question: "One hears about 'morning types' and 'evening types.' Which one of these types do you consider yourself to be?",
    options: [
      { text: "Definitely a morning type", score: 6 },
      { text: "Rather more a morning type than an evening type", score: 4 },
      { text: "Rather more an evening type than a morning type", score: 2 },
      { text: "Definitely an evening type", score: 1 }
    ]
  }
];

const rusatedQuestions = [
  {
    question: "Do you go to bed and get out of bed at about the same times (within one hour) every day?",
    options: [
      { text: "Rarely/Never", score: 0 },
      { text: "Sometimes", score: 1 },
      { text: "Usually/Always", score: 2 }
    ]
  },
  {
    question: "Are you satisfied with your sleep?",
    options: [
      { text: "Rarely/Never", score: 0 },
      { text: "Sometimes", score: 1 },
      { text: "Usually/Always", score: 2 }
    ]
  },
  {
    question: "Do you stay awake all day without dozing?",
    options: [
      { text: "Rarely/Never", score: 0 },
      { text: "Sometimes", score: 1 },
      { text: "Usually/Always", score: 2 }
    ]
  },
  {
    question: "Are you asleep (or in bed) between 2:00 a.m. and 4:00 a.m.?",
    options: [
      { text: "Rarely/Never", score: 0 },
      { text: "Sometimes", score: 1 },
      { text: "Usually/Always", score: 2 }
    ]
  },
  {
    question: "Do you spend less than 30 minutes awake at night? This includes the time it takes to fall asleep plus awakenings during sleep.",
    options: [
      { text: "Rarely/Never", score: 0 },
      { text: "Sometimes", score: 1 },
      { text: "Usually/Always", score: 2 }
    ]
  },
  {
    question: "Do you sleep between 7 and 9 hours per day?",
    options: [
      { text: "Rarely/Never", score: 0 },
      { text: "Sometimes", score: 1 },
      { text: "Usually/Always", score: 2 }
    ]
  }
];

const scaleDescriptions = {
  epworth: {
    title: "Epworth Sleepiness Scale",
    description: "The Epworth Sleepiness Scale (ESS) is a self-administered questionnaire that provides a measure of a person's general level of daytime sleepiness.",
    scoring: {
      "0": "Would never doze or sleep",
      "1": "Slight chance of dozing or sleeping",
      "2": "Moderate chance of dozing or sleeping",
      "3": "High chance of dozing or sleeping"
    }
  },
  meq: {
    title: "Morningness-Eveningness Questionnaire",
    description: "The MEQ helps determine whether you are a morning person, evening person, or somewhere in between. This is known as your chronotype.",
    scoring: {
      "0": "Strong evening preference",
      "1": "Moderate evening preference",
      "2": "Neutral preference",
      "3": "Strong morning preference"
    }
  },
  rusated: {
    title: "RU-SATED Scale",
    description: "The RU-SATED scale assesses six dimensions of sleep health: Regularity, Satisfaction, Alertness, Timing, Efficiency, and Duration.",
    scoring: {
      "0": "Never/Rarely",
      "1": "Sometimes",
      "2": "Usually",
      "3": "Always"
    }
  }
};

export default function Scales() {
  const [currentScale, setCurrentScale] = useState<'epworth' | 'meq' | 'rusated' | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [results, setResults] = useState<ScaleResult[]>([]);

  const handleScaleSelect = (scale: 'epworth' | 'meq' | 'rusated') => {
    setCurrentScale(scale);
    setAnswers([]);
  };

  const handleAnswer = (value: number) => {
    if (currentScale === 'meq') {
      const score = meqQuestions[answers.length].options[value].score;
      setAnswers([...answers, score]);
    } else if (currentScale === 'rusated') {
      const score = rusatedQuestions[answers.length].options[value].score;
      setAnswers([...answers, score]);
    } else {
      setAnswers([...answers, value]);
    }
  };

  const calculateScore = () => {
    if (!currentScale) return;

    let score = 0;
    let interpretation = '';

    switch (currentScale) {
      case 'epworth':
        score = answers.reduce((a, b) => a + b, 0);
        if (score <= 7) interpretation = "Normal range of daytime sleepiness";
        else if (score <= 9) interpretation = "Mild excessive daytime sleepiness";
        else if (score <= 15) interpretation = "Moderate excessive daytime sleepiness";
        else interpretation = "Severe excessive daytime sleepiness";
        break;

      case 'meq':
        score = answers.reduce((a, b) => a + b, 0);
        if (score >= 70) interpretation = "Definite morning type";
        else if (score >= 59) interpretation = "Moderate morning type";
        else if (score >= 42) interpretation = "Intermediate type";
        else if (score >= 31) interpretation = "Moderate evening type";
        else interpretation = "Definite evening type";
        break;

      case 'rusated':
        score = answers.reduce((a, b) => a + b, 0);
        if (score >= 8) interpretation = "Excellent sleep health";
        else if (score >= 6) interpretation = "Good sleep health";
        else if (score >= 4) interpretation = "Fair sleep health";
        else interpretation = "Poor sleep health";
        break;
    }

    const newResult = {
      name: currentScale.charAt(0).toUpperCase() + currentScale.slice(1) + " Scale",
      score,
      interpretation
    };

    setResults(prevResults => {
      const otherResults = prevResults.filter(r => !r.name.includes(currentScale));
      return [...otherResults, newResult];
    });
    
    setCurrentScale(null);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">Sleep Rating Scales</h1>
        
        {!currentScale ? (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {Object.entries(scaleDescriptions).map(([key, scale]) => (
              <button
                key={key}
                onClick={() => handleScaleSelect(key as 'epworth' | 'meq' | 'rusated')}
                className="bg-white/10 p-6 rounded-lg backdrop-blur-lg hover:bg-white/20 transition-all transform hover:scale-105"
              >
                <h2 className="text-xl font-semibold mb-2">{scale.title}</h2>
                <p className="text-gray-300 mb-4">{scale.description}</p>
                <div className="text-sm text-purple-300">
                  <p className="font-semibold mb-2">Score Meanings:</p>
                  {Object.entries(scale.scoring).map(([score, meaning]) => (
                    <p key={score} className="mb-1">
                      <span className="font-bold">{score}:</span> {meaning}
                    </p>
                  ))}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white/10 p-8 rounded-lg backdrop-blur-lg">
            <h2 className="text-2xl font-semibold mb-6">
              {currentScale === 'epworth' && 'Epworth Sleepiness Scale'}
              {currentScale === 'meq' && 'Morningness-Eveningness Questionnaire'}
              {currentScale === 'rusated' && 'RU-SATED Scale'}
            </h2>
            
            {answers.length < (currentScale === 'epworth' ? epworthQuestions.length : 
                             currentScale === 'meq' ? meqQuestions.length : 
                             rusatedQuestions.length) ? (
              <div>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">
                      Question {answers.length + 1} of {
                        currentScale === 'epworth' ? epworthQuestions.length :
                        currentScale === 'meq' ? meqQuestions.length :
                        rusatedQuestions.length
                      }
                    </span>
                    <span className="text-sm text-purple-300">
                      {Math.round((answers.length / (
                        currentScale === 'epworth' ? epworthQuestions.length :
                        currentScale === 'meq' ? meqQuestions.length :
                        rusatedQuestions.length
                      )) * 100)}% Complete
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full">
                    <div 
                      className="h-full bg-purple-500 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(answers.length / (
                          currentScale === 'epworth' ? epworthQuestions.length :
                          currentScale === 'meq' ? meqQuestions.length :
                          rusatedQuestions.length
                        )) * 100}%` 
                      }}
                    />
                  </div>
                </div>

                <p className="mb-4">
                  {currentScale === 'epworth' && epworthQuestions[answers.length]}
                  {currentScale === 'meq' && meqQuestions[answers.length].question}
                  {currentScale === 'rusated' && rusatedQuestions[answers.length].question}
                </p>
                <div className="mb-6 p-4 bg-white/5 rounded-lg">
                  <p className="text-sm font-semibold mb-2 text-purple-300">Score Meanings:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {currentScale === 'meq' ? (
                      meqQuestions[answers.length].options.map((option, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-bold">{option.score}:</span> {option.text}
                        </div>
                      ))
                    ) : currentScale === 'rusated' ? (
                      rusatedQuestions[answers.length].options.map((option, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-bold">{option.score}:</span> {option.text}
                        </div>
                      ))
                    ) : (
                      Object.entries(scaleDescriptions[currentScale].scoring).map(([score, meaning]) => (
                        <div key={score} className="text-sm">
                          <span className="font-bold">{score}:</span> {meaning}
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {currentScale === 'meq' ? (
                    meqQuestions[answers.length].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="bg-white/5 hover:bg-white/10 p-4 rounded-lg transition-all"
                      >
                        {option.text}
                      </button>
                    ))
                  ) : currentScale === 'rusated' ? (
                    rusatedQuestions[answers.length].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="bg-white/5 hover:bg-white/10 p-4 rounded-lg transition-all"
                      >
                        {option.text}
                      </button>
                    ))
                  ) : (
                    [0, 1, 2, 3].map((value) => (
                      <button
                        key={value}
                        onClick={() => handleAnswer(value)}
                        className="bg-white/5 hover:bg-white/10 p-4 rounded-lg transition-all"
                      >
                        {value}
                      </button>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={calculateScore}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition-colors"
              >
                Calculate Score
              </button>
            )}
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Your Results</h2>
            {results.map((result, index) => (
              <div key={index} className="bg-white/10 p-6 rounded-lg backdrop-blur-lg mb-4">
                <h3 className="text-xl font-semibold mb-2">{result.name}</h3>
                <p className="text-lg mb-2">Score: {result.score}</p>
                <p className="text-purple-300">{result.interpretation}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 