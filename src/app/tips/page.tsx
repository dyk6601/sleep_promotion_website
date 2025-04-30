const tips = [
  {
    title: "Maintain a Consistent Sleep Schedule",
    description: "Go to bed and wake up at the same time every day, even on weekends. This helps regulate your body's internal clock.",
    icon: "🕒"
  },
  {
    title: "Create a Relaxing Bedtime Routine",
    description: "Develop a pre-sleep routine that helps you wind down, such as reading, light stretching, or meditation.",
    icon: "📚"
  },
  {
    title: "Optimize Your Sleep Environment",
    description: "Keep your bedroom cool, dark, and quiet. Use comfortable bedding and consider using blackout curtains or a white noise machine.",
    icon: "🌙"
  },
  {
    title: "Limit Screen Time",
    description: "Avoid blue light from phones, tablets, and computers at least 1 hour before bedtime, as it can interfere with your sleep cycle.",
    icon: "📱"
  },
  {
    title: "Watch Your Diet",
    description: "Avoid large meals, caffeine, and alcohol close to bedtime. These can disrupt your sleep quality.",
    icon: "🍽️"
  },
  {
    title: "Exercise Regularly",
    description: "Regular physical activity can help you fall asleep faster and enjoy deeper sleep, but avoid vigorous exercise close to bedtime.",
    icon: "🏃‍♂️"
  }
];

const funFacts = [
  {
    fact: "During REM sleep, your brain is almost as active as when you're awake! This is when you have your most vivid dreams.",
    icon: "🧠"
  },
  {
    fact: "The world record for the longest period without sleep is 11 days! But don't try this - it's extremely dangerous!",
    icon: "⏰"
  },
  {
    fact: "Dolphins sleep with one eye open and half their brain awake to watch for predators!",
    icon: "🐬"
  },
  {
    fact: "The average person spends about 6 years of their life dreaming!",
    icon: "💭"
  },
  {
    fact: "Your body temperature drops by about 2 degrees when you fall asleep, helping you sleep better!",
    icon: "🌡️"
  }
];

export default function Tips() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Sleep Hygiene Tips</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white/10 p-6 rounded-lg backdrop-blur-lg transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">{tip.icon}</div>
              <h2 className="text-xl font-semibold mb-3">{tip.title}</h2>
              <p className="text-gray-200">{tip.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white/10 p-8 rounded-lg backdrop-blur-lg">
          <h2 className="text-2xl font-semibold mb-4">Did You Know? 🤔</h2>
          <div className="space-y-6">
            {funFacts.map((fact, index) => (
              <div key={index} className="flex items-start space-x-4 animate-fade-in">
                <span className="text-3xl">{fact.icon}</span>
                <p className="text-gray-200 text-lg">{fact.fact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 