export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const BADGES: Badge[] = [
  {
    id: 'first_appreciator',
    name: 'First Appreciator',
    description: 'Be the first to appreciate someone',
    icon: '🌟',
    rarity: 'common',
  },
  {
    id: 'super_fan',
    name: 'Super Fan',
    description: '10+ appreciations for one person',
    icon: '🔥',
    rarity: 'rare',
  },
  {
    id: 'team_player',
    name: 'Team Player',
    description: 'Appreciate all 8 team members',
    icon: '👥',
    rarity: 'epic',
  },
  {
    id: 'wordsmith',
    name: 'Wordsmith',
    description: 'Write 100+ character appreciation',
    icon: '✍️',
    rarity: 'rare',
  },
  {
    id: 'consistent',
    name: 'Consistent',
    description: '7-day appreciation streak',
    icon: '📅',
    rarity: 'epic',
  },
  {
    id: 'viral',
    name: 'Viral',
    description: 'Share appreciation on X',
    icon: '🚀',
    rarity: 'rare',
  },
];

export const getBadgeColor = (rarity: string): string => {
  switch (rarity) {
    case 'common':
      return 'text-gray-400';
    case 'rare':
      return 'text-blue-400';
    case 'epic':
      return 'text-purple-400';
    case 'legendary':
      return 'text-yellow-400';
    default:
      return 'text-gray-400';
  }
};

export const getBadgeBgColor = (rarity: string): string => {
  switch (rarity) {
    case 'common':
      return 'bg-gray-500/20';
    case 'rare':
      return 'bg-blue-500/20';
    case 'epic':
      return 'bg-purple-500/20';
    case 'legendary':
      return 'bg-yellow-500/20';
    default:
      return 'bg-gray-500/20';
  }
};

