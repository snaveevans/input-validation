import { useState } from 'react';
import { challenges } from '../challenges';
import ChallengeCard from '../components/ChallengeCard';
import { DifficultyLevel } from '../types';
import { getProgress } from '../utils/storage';

export default function Home() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');

  const progress = getProgress();
  const completedCount = Object.values(progress).filter(p => p.completed).length;

  const filteredChallenges = selectedDifficulty === 'all'
    ? challenges
    : challenges.filter(c => c.difficulty === selectedDifficulty);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            React Hook Form Playground
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Master form validation with escalating challenges
          </p>
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
            <span className="font-semibold">{completedCount}</span> / {challenges.length} challenges completed
          </div>
        </div>

        <div className="mb-8 flex justify-center gap-2">
          <button
            onClick={() => setSelectedDifficulty('all')}
            className={`px-4 py-2 rounded-md ${
              selectedDifficulty === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedDifficulty('beginner')}
            className={`px-4 py-2 rounded-md ${
              selectedDifficulty === 'beginner'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setSelectedDifficulty('intermediate')}
            className={`px-4 py-2 rounded-md ${
              selectedDifficulty === 'intermediate'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Intermediate
          </button>
          <button
            onClick={() => setSelectedDifficulty('advanced')}
            className={`px-4 py-2 rounded-md ${
              selectedDifficulty === 'advanced'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Advanced
          </button>
          <button
            onClick={() => setSelectedDifficulty('expert')}
            className={`px-4 py-2 rounded-md ${
              selectedDifficulty === 'expert'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Expert
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map(challenge => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>
    </div>
  );
}
