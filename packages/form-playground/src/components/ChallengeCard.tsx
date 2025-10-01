import { Challenge } from '../types';
import { getChallengeProgress } from '../utils/storage';
import { Link } from 'react-router-dom';

interface Props {
  challenge: Challenge;
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-blue-100 text-blue-800',
  advanced: 'bg-orange-100 text-orange-800',
  expert: 'bg-red-100 text-red-800'
};

export default function ChallengeCard({ challenge }: Props) {
  const progress = getChallengeProgress(challenge.id);

  return (
    <Link
      to={`/challenge/${challenge.id}`}
      className="block p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
        {progress?.completed && (
          <span className="text-green-600 text-xl">✓</span>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>

      <div className="flex items-center gap-2">
        <span className={`text-xs px-2 py-1 rounded ${difficultyColors[challenge.difficulty]}`}>
          {challenge.difficulty}
        </span>
        <span className="text-xs text-gray-500">{challenge.category}</span>
      </div>

      {progress && progress.attempts > 0 && (
        <div className="mt-3 text-xs text-gray-500">
          Attempts: {progress.attempts}
        </div>
      )}
    </Link>
  );
}
