"use client";

import { useState } from 'react';

const resources = [
  {
    title: 'How Little Sleep Can You Get Away With?',
    summary: 'This article by Maggie Jones explores the risks and consequences of chronic sleep deprivation, examining how lack of sleep affects health, cognitive function, and emotional well-being. It discusses scientific findings on the minimum amount of sleep needed and the dangers of consistently getting too little.',
    type: 'Article',
    category: 'Sleep Science',
    url: 'https://www.nytimes.com/2011/04/17/magazine/mag-17Sleep-t.html'
  },
  {
    title: 'The costs of short sleep',
    summary: "This article discusses the vital role of sleep in restoring the body, consolidating memory, and maintaining emotional balance. It highlights the health risks, reduced productivity, and increased accident risk associated with inadequate sleep, emphasizing that neither diet nor exercise can replace the need for quality sleep.",
    type: 'Article',
    category: 'Sleep Health',
    url: 'https://pubmed.ncbi.nlm.nih.gov/19715262/'
  },
  {
    title: 'Neuroscience: Off to night school',
    summary: 'This article explores how sleep, especially slow-wave and REM phases, plays a crucial role in processing, consolidating, and reconfiguring memories. It discusses the latest neuroscience research on how the sleeping brain strengthens learning and memory, and why good sleep is essential for both children and adults.',
    type: 'Article',
    category: 'Sleep Science',
    url: 'https://www.nature.com/articles/497S4a'
  },
  {
    title: 'Sleep and Academic Performance: Examining the Impact of Sleep on College Students',
    summary: 'This article examines how sleep quality and duration influence academic performance among college students. It discusses the consequences of poor sleep on learning, memory, and grades, and highlights the importance of healthy sleep habits for student success.',
    type: 'Article',
    category: 'Sleep & Learning',
    url: 'https://www.tandfonline.com/doi/full/10.1080/07448481.2017.1369091'
  },
  {
    title: 'How Sleep Affects Mental Health',
    summary: 'Discover the strong connection between sleep and emotional well-being.',
    type: 'Article',
    category: 'Mental Health',
    url: 'https://www.sleepfoundation.org/mental-health'
  },
  {
    title: 'Tips for Better Naps',
    summary: 'A quick guide to napping for energy and health.',
    type: 'Infographic',
    category: 'Sleep Hygiene',
    url: 'https://www.sleepfoundation.org/sleep-hygiene/napping'
  },
  {
    title: 'What Are Dreams?',
    summary: 'A short video about why we dream and what dreams might mean.',
    type: 'Video',
    category: 'Sleep Science',
    url: 'https://www.youtube.com/watch?v=7GGzc3x9WJU'
  },
  {
    title: 'The Science of Sleep: Why Sleep Matters',
    summary: 'This video explains the science behind why sleep is essential for health, learning, and well-being. It covers the biological processes that occur during sleep and the consequences of sleep deprivation.',
    type: 'Video',
    category: 'Sleep Science',
    url: 'https://www.youtube.com/watch?v=idrbwnWLJ7w'
  }
];

const categories = [
  'All',
  ...Array.from(new Set(resources.map(r => r.category)))
];

export default function Education() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = resources.filter(r =>
    (category === 'All' || r.category === category) &&
    (r.title.toLowerCase().includes(search.toLowerCase()) ||
     r.summary.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-8">Educational Content Hub</h1>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <input
            type="text"
            placeholder="Search topics..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.length === 0 ? (
            <p className="text-center col-span-2 text-gray-300">No resources found.</p>
          ) : (
            filtered.map((r, i) => (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white/10 p-6 rounded-lg backdrop-blur-lg hover:bg-white/20 transition-all shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center mb-2">
                  <span className="text-purple-300 font-semibold mr-2">{r.type}</span>
                  <span className="bg-purple-700 text-xs px-2 py-1 rounded-full">{r.category}</span>
                </div>
                <h2 className="text-xl font-semibold mb-1">{r.title}</h2>
                <p className="text-gray-200 mb-2">{r.summary}</p>
                <span className="text-purple-400 text-sm">Learn more &rarr;</span>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 