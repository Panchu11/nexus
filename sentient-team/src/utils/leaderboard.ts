import { database, Comment } from './database';
import { TEAM_MEMBERS } from '@/data/team';

export type TimeRange = 'week' | 'month' | 'all';

export interface LeaderboardEntry {
  rank: number;
  name: string;
  count: number;
  percentage: number;
  avatar?: string;
}

export interface AppreciatorEntry {
  rank: number;
  xHandle: string;
  count: number;
}

export const getMostAppreciatedMembers = async (
  timeRange: TimeRange = 'all'
): Promise<LeaderboardEntry[]> => {
  try {
    const now = new Date();
    let startDate: Date | null = null;

    if (timeRange === 'week') {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeRange === 'month') {
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Get all comments
    const allComments: Comment[] = [];
    for (const member of TEAM_MEMBERS) {
      const comments = await database.getComments(member.id);
      allComments.push(...comments);
    }

    // Filter by date range
    const filteredComments = startDate
      ? allComments.filter(
          (c) => new Date(c.created_at) >= startDate!
        )
      : allComments;

    const totalComments = filteredComments.length;

    // Count per member
    const memberCounts = TEAM_MEMBERS.map((member) => {
      const count = filteredComments.filter(
        (c) => c.member_id === member.id
      ).length;
      return {
        name: member.name,
        count,
        avatar: member.avatar,
      };
    })
      .sort((a, b) => b.count - a.count)
      .map((entry, index) => ({
        rank: index + 1,
        name: entry.name,
        count: entry.count,
        percentage: totalComments > 0 ? (entry.count / totalComments) * 100 : 0,
        avatar: entry.avatar,
      }));

    return memberCounts;
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return [];
  }
};

export const getMostActiveAppreciators = async (
  timeRange: TimeRange = 'all'
): Promise<AppreciatorEntry[]> => {
  try {
    const now = new Date();
    let startDate: Date | null = null;

    if (timeRange === 'week') {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeRange === 'month') {
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Get all comments
    const allComments: Comment[] = [];
    for (const member of TEAM_MEMBERS) {
      const comments = await database.getComments(member.id);
      allComments.push(...comments);
    }

    // Filter by date range
    const filteredComments = startDate
      ? allComments.filter(
          (c) => new Date(c.created_at) >= startDate!
        )
      : allComments;

    // Count per appreciator
    const appreciatorMap = new Map<string, number>();
    filteredComments.forEach((comment) => {
      const handle = comment.x_handle || 'Anonymous';
      appreciatorMap.set(handle, (appreciatorMap.get(handle) || 0) + 1);
    });

    const appreciators = Array.from(appreciatorMap.entries())
      .map(([xHandle, count]) => ({ xHandle, count }))
      .sort((a, b) => b.count - a.count)
      .map((entry, index) => ({
        rank: index + 1,
        xHandle: entry.xHandle,
        count: entry.count,
      }));

    return appreciators;
  } catch (error) {
    console.error('Error getting appreciators:', error);
    return [];
  }
};

export const getLongestStreak = async (): Promise<{
  xHandle: string;
  streak: number;
} | null> => {
  try {
    // Get all comments
    const allComments: Comment[] = [];
    for (const member of TEAM_MEMBERS) {
      const comments = await database.getComments(member.id);
      allComments.push(...comments);
    }

    // Group by appreciator and date
    const appreciatorDates = new Map<string, Set<string>>();
    allComments.forEach((comment) => {
      const handle = comment.x_handle || 'Anonymous';
      const date = new Date(comment.created_at).toLocaleDateString();

      if (!appreciatorDates.has(handle)) {
        appreciatorDates.set(handle, new Set());
      }
      appreciatorDates.get(handle)!.add(date);
    });

    // Calculate streaks
    let maxStreak = 0;
    let maxStreakHandle = '';

    appreciatorDates.forEach((dates, handle) => {
      const sortedDates = Array.from(dates)
        .map((d) => new Date(d).getTime())
        .sort((a, b) => a - b);

      let currentStreak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        const dayDiff =
          (sortedDates[i] - sortedDates[i - 1]) / (1000 * 60 * 60 * 24);
        if (dayDiff === 1) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }

        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
          maxStreakHandle = handle;
        }
      }
    });

    return maxStreak > 0 ? { xHandle: maxStreakHandle, streak: maxStreak } : null;
  } catch (error) {
    console.error('Error getting streak:', error);
    return null;
  }
};

