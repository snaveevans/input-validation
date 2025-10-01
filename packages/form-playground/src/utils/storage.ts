import { ChallengeProgress } from '../types';

const STORAGE_KEY = 'rhf-playground-progress';

export const getProgress = (): Record<string, ChallengeProgress> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export const saveProgress = (challengeId: string, completed: boolean) => {
  const progress = getProgress();
  const existing = progress[challengeId];

  progress[challengeId] = {
    challengeId,
    completed,
    attempts: (existing?.attempts || 0) + 1,
    lastAttempt: new Date()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const resetProgress = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getChallengeProgress = (challengeId: string): ChallengeProgress | null => {
  const progress = getProgress();
  return progress[challengeId] || null;
};
