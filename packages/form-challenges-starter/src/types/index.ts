export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Challenge {
  id: string;
  title: string;
  difficulty: DifficultyLevel;
  description: string;
  requirements: string[];
  hints: string[];
  category: string;
  component: React.ComponentType;
}

export interface ChallengeProgress {
  challengeId: string;
  completed: boolean;
  attempts: number;
  lastAttempt: Date | null;
}
