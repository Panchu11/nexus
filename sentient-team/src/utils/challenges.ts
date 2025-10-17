import { database, Comment } from './database';
import { TEAM_MEMBERS } from '@/data/team';

export interface ChallengeProgress {
  challengeId: string;
  progress: number;
  completed: boolean;
  completedAt?: string;
}

export const getChallengeProgress = async (
  userIdentifier: string
): Promise<ChallengeProgress[]> => {
  try {
    // Get all comments
    const allComments: Comment[] = [];
    for (const member of TEAM_MEMBERS) {
      const comments = await database.getComments(member.id);
      allComments.push(...comments);
    }

    // Filter by user
    const userComments = allComments.filter(
      (c) => c.x_handle === userIdentifier || c.x_handle === `@${userIdentifier}`
    );

    // Get this week's start date (Monday)
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const weekStart = new Date(now.setDate(diff));
    weekStart.setHours(0, 0, 0, 0);

    const thisWeekComments = userComments.filter(
      (c) => new Date(c.created_at) >= weekStart
    );

    // Challenge 1: Appreciate 3 different people
    const uniqueMembers = new Set(thisWeekComments.map((c) => c.member_id));
    const challenge1Progress = Math.min(uniqueMembers.size, 3);

    // Challenge 2: Write 100+ character appreciation
    const challenge2Progress = thisWeekComments.some(
      (c) => c.message.length >= 100
    )
      ? 1
      : 0;

    // Challenge 3: Share on X
    const challenge3Progress = thisWeekComments.some((c) => c.message.includes('X'))
      ? 1
      : 0;

    // Challenge 4: Appreciate all 8 members
    const challenge4Progress = Math.min(uniqueMembers.size, 8);

    return [
      {
        challengeId: 'appreciate_three',
        progress: challenge1Progress,
        completed: challenge1Progress >= 3,
      },
      {
        challengeId: 'wordsmith_challenge',
        progress: challenge2Progress,
        completed: challenge2Progress >= 1,
      },
      {
        challengeId: 'viral_challenge',
        progress: challenge3Progress,
        completed: challenge3Progress >= 1,
      },
      {
        challengeId: 'team_player_challenge',
        progress: challenge4Progress,
        completed: challenge4Progress >= 8,
      },
    ];
  } catch (error) {
    console.error('Error getting challenge progress:', error);
    return [
      {
        challengeId: 'appreciate_three',
        progress: 0,
        completed: false,
      },
      {
        challengeId: 'wordsmith_challenge',
        progress: 0,
        completed: false,
      },
      {
        challengeId: 'viral_challenge',
        progress: 0,
        completed: false,
      },
      {
        challengeId: 'team_player_challenge',
        progress: 0,
        completed: false,
      },
    ];
  }
};

export const getWeeklyStats = async (userIdentifier: string) => {
  try {
    // Get all comments
    const allComments: Comment[] = [];
    for (const member of TEAM_MEMBERS) {
      const comments = await database.getComments(member.id);
      allComments.push(...comments);
    }

    // Filter by user
    const userComments = allComments.filter(
      (c) => c.x_handle === userIdentifier || c.x_handle === `@${userIdentifier}`
    );

    // Get this week's start date
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const weekStart = new Date(now.setDate(diff));
    weekStart.setHours(0, 0, 0, 0);

    const thisWeekComments = userComments.filter(
      (c) => new Date(c.created_at) >= weekStart
    );

    return {
      totalAppreciations: thisWeekComments.length,
      uniqueMembers: new Set(thisWeekComments.map((c) => c.member_id)).size,
      longestMessage: Math.max(
        ...thisWeekComments.map((c) => c.message.length),
        0
      ),
      sharedCount: thisWeekComments.filter((c) =>
        c.message.toLowerCase().includes('x')
      ).length,
    };
  } catch (error) {
    console.error('Error getting weekly stats:', error);
    return {
      totalAppreciations: 0,
      uniqueMembers: 0,
      longestMessage: 0,
      sharedCount: 0,
    };
  }
};

