import { useParams, Link } from 'react-router-dom';
import { getChallengeById } from '../challenges';
import { useState } from 'react';
import { saveProgress } from '../utils/storage';

export default function ChallengePage() {
  const { id } = useParams<{ id: string }>();
  const challenge = id ? getChallengeById(id) : null;
  const [showSolution, setShowSolution] = useState(false);

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Challenge not found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const ChallengeComponent = challenge.component;

  const handleComplete = () => {
    saveProgress(challenge.id, true);
    alert('Challenge completed! Great job!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="text-blue-600 hover:text-blue-700 mb-6 inline-block">
          ← Back to challenges
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{challenge.title}</h1>
              <span className={`inline-block text-xs px-2 py-1 rounded ${
                challenge.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                challenge.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                challenge.difficulty === 'advanced' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {challenge.difficulty}
              </span>
            </div>

            <p className="text-gray-700 mb-6">{challenge.description}</p>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h2>
              <ul className="space-y-2">
                {challenge.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Hints</h2>
              <ul className="space-y-2">
                {challenge.hints.map((hint, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">💡</span>
                    <span className="text-gray-700">{hint}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleComplete}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Mark as Complete
              </button>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
            </div>

            {showSolution && (
              <div className="mt-6 p-4 bg-gray-100 rounded-md">
                <p className="text-sm text-gray-700">
                  The solution is implemented in the form on the right. Study how react-hook-form's
                  features are used to achieve the requirements. Pay attention to the register function,
                  validation rules, error handling, and any hooks used (watch, useFieldArray, etc.).
                </p>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Try it yourself</h2>
            <ChallengeComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
