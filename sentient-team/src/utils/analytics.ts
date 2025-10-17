import { database, Comment } from './database';
import { TEAM_MEMBERS } from '@/data/team';

export interface AnalyticsData {
  totalAppreciations: number;
  memberStats: Array<{
    memberId: string;
    memberName: string;
    count: number;
    percentage: number;
  }>;
  topAppreciators: Array<{
    xHandle: string;
    count: number;
  }>;
  sentimentAnalysis: {
    positive: number;
    neutral: number;
    negative: number;
  };
  wordFrequency: Array<{
    word: string;
    count: number;
  }>;
  dailyTrend: Array<{
    date: string;
    count: number;
  }>;
}

export const getAnalyticsData = async (): Promise<AnalyticsData> => {
  try {
    // Get all comments
    const allComments: Comment[] = [];
    for (const member of TEAM_MEMBERS) {
      const comments = await database.getComments(member.id);
      allComments.push(...comments);
    }

    const totalAppreciations = allComments.length;

    // Member stats
    const memberStats = TEAM_MEMBERS.map((member) => {
      const count = allComments.filter(
        (c) => c.member_id === member.id
      ).length;
      return {
        memberId: member.id,
        memberName: member.name,
        count,
        percentage: totalAppreciations > 0 ? (count / totalAppreciations) * 100 : 0,
      };
    }).sort((a, b) => b.count - a.count);

    // Top appreciators
    const appreciatorMap = new Map<string, number>();
    allComments.forEach((comment) => {
      const handle = comment.x_handle || 'Anonymous';
      appreciatorMap.set(handle, (appreciatorMap.get(handle) || 0) + 1);
    });

    const topAppreciators = Array.from(appreciatorMap.entries())
      .map(([xHandle, count]) => ({ xHandle, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Sentiment analysis (simple keyword-based)
    const positiveWords = [
      'amazing',
      'great',
      'awesome',
      'excellent',
      'wonderful',
      'fantastic',
      'brilliant',
      'love',
      'appreciate',
      'grateful',
      'thank',
      'best',
      'incredible',
      'outstanding',
    ];
    const negativeWords = [
      'bad',
      'terrible',
      'awful',
      'horrible',
      'poor',
      'worst',
      'hate',
      'dislike',
    ];

    let positive = 0,
      neutral = 0,
      negative = 0;

    allComments.forEach((comment) => {
      const text = comment.message.toLowerCase();
      const hasPositive = positiveWords.some((word) => text.includes(word));
      const hasNegative = negativeWords.some((word) => text.includes(word));

      if (hasPositive) positive++;
      else if (hasNegative) negative++;
      else neutral++;
    });

    // Word frequency
    const wordMap = new Map<string, number>();
    const stopWords = new Set([
      'the',
      'a',
      'an',
      'and',
      'or',
      'but',
      'in',
      'on',
      'at',
      'to',
      'for',
      'of',
      'is',
      'are',
      'was',
      'were',
      'be',
      'been',
      'being',
      'have',
      'has',
      'had',
      'do',
      'does',
      'did',
      'will',
      'would',
      'could',
      'should',
      'may',
      'might',
      'must',
      'can',
      'i',
      'you',
      'he',
      'she',
      'it',
      'we',
      'they',
      'what',
      'which',
      'who',
      'when',
      'where',
      'why',
      'how',
    ]);

    allComments.forEach((comment) => {
      const words = comment.message
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.length > 3 && !stopWords.has(word));

      words.forEach((word) => {
        wordMap.set(word, (wordMap.get(word) || 0) + 1);
      });
    });

    const wordFrequency = Array.from(wordMap.entries())
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    // Daily trend
    const dailyMap = new Map<string, number>();
    allComments.forEach((comment) => {
      const date = new Date(comment.created_at).toLocaleDateString();
      dailyMap.set(date, (dailyMap.get(date) || 0) + 1);
    });

    const dailyTrend = Array.from(dailyMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      totalAppreciations,
      memberStats,
      topAppreciators,
      sentimentAnalysis: {
        positive,
        neutral,
        negative,
      },
      wordFrequency,
      dailyTrend,
    };
  } catch (error) {
    console.error('Error getting analytics data:', error);
    return {
      totalAppreciations: 0,
      memberStats: [],
      topAppreciators: [],
      sentimentAnalysis: { positive: 0, neutral: 0, negative: 0 },
      wordFrequency: [],
      dailyTrend: [],
    };
  }
};

export const exportAnalyticsAsCSV = (data: AnalyticsData): string => {
  let csv = 'Sentient Team Appreciation Analytics\n\n';

  csv += `Total Appreciations,${data.totalAppreciations}\n\n`;

  csv += 'Member Statistics\n';
  csv += 'Member Name,Count,Percentage\n';
  data.memberStats.forEach((stat) => {
    csv += `${stat.memberName},${stat.count},${stat.percentage.toFixed(2)}%\n`;
  });

  csv += '\nTop Appreciators\n';
  csv += 'X Handle,Count\n';
  data.topAppreciators.forEach((appreciator) => {
    csv += `${appreciator.xHandle},${appreciator.count}\n`;
  });

  csv += '\nSentiment Analysis\n';
  csv += `Positive,${data.sentimentAnalysis.positive}\n`;
  csv += `Neutral,${data.sentimentAnalysis.neutral}\n`;
  csv += `Negative,${data.sentimentAnalysis.negative}\n`;

  return csv;
};

