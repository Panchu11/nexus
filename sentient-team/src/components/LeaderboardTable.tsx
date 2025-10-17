'use client';

import { motion } from 'framer-motion';
import { LeaderboardEntry, AppreciatorEntry } from '@/utils/leaderboard';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[] | AppreciatorEntry[];
  title: string;
  type: 'members' | 'appreciators';
}

export default function LeaderboardTable({
  entries,
  title,
  type,
}: LeaderboardTableProps) {
  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500 to-yellow-600';
      case 2:
        return 'from-gray-400 to-gray-500';
      case 3:
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-cyan-500/20 to-fuchsia-500/20';
    }
  };

  return (
    <motion.div
      className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/50 border border-cyan-500/40 rounded-xl hover:border-cyan-400/60 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <span className="text-2xl">{title.split(' ')[0]}</span> {title.split(' ').slice(1).join(' ')}
      </h3>

      {entries.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No data yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-lg border transition-all backdrop-blur-sm ${
                entry.rank <= 3
                  ? `bg-gradient-to-r ${getMedalColor(entry.rank)} border-yellow-500/60 shadow-lg shadow-yellow-500/20`
                  : 'bg-slate-700/40 border-cyan-500/30 hover:border-cyan-500/60 hover:bg-slate-700/60'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xl shadow-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    {getMedalEmoji(entry.rank)}
                  </motion.div>

                  <div className="flex-1">
                    <p className="font-semibold text-white text-lg">
                      {type === 'members'
                        ? (entry as LeaderboardEntry).name
                        : (entry as AppreciatorEntry).xHandle}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Rank #{entry.rank}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
                    {entry.count}
                  </p>
                  {type === 'members' && (
                    <p className="text-xs text-gray-400 mt-1">
                      {((entry as LeaderboardEntry).percentage || 0).toFixed(1)}%
                    </p>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-2 bg-slate-900/50 rounded-full overflow-hidden border border-slate-700/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 shadow-lg shadow-cyan-500/50"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      type === 'members'
                        ? (entry as LeaderboardEntry).percentage
                        : (entry.count / entries[0].count) * 100
                    }%`,
                  }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

