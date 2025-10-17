export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  reward: string;
  type: 'count' | 'character' | 'share' | 'members';
}

export const CHALLENGES: Challenge[] = [
  {
    id: 'appreciate_three',
    title: 'Appreciate 3 People',
    description: 'Appreciate 3 different team members this week',
    icon: '👥',
    target: 3,
    reward: '🏆 Challenge Master',
    type: 'count',
  },
  {
    id: 'wordsmith_challenge',
    title: 'Wordsmith',
    description: 'Write a 100+ character appreciation',
    icon: '✍️',
    target: 100,
    reward: '✍️ Wordsmith Badge',
    type: 'character',
  },
  {
    id: 'viral_challenge',
    title: 'Go Viral',
    description: 'Share an appreciation on X',
    icon: '🚀',
    target: 1,
    reward: '🚀 Viral Badge',
    type: 'share',
  },
  {
    id: 'team_player_challenge',
    title: 'Team Player',
    description: 'Appreciate all 8 team members',
    icon: '👥',
    target: 8,
    reward: '👥 Team Player Badge',
    type: 'members',
  },
];

export const getChallengeProgress = (
  current: number,
  target: number
): number => {
  return Math.min((current / target) * 100, 100);
};

export const isChallengeCompleted = (
  current: number,
  target: number
): boolean => {
  return current >= target;
};

