'use client';

import { motion } from 'framer-motion';
import { CHALLENGES } from '@/data/challenges';
import { ChallengeProgress } from '@/utils/challenges';

interface ChallengeBoardProps {
  progress: ChallengeProgress[];
}

export default function ChallengeBoard({ progress }: ChallengeBoardProps) {
  const getProgressPercentage = (challengeId: string): number => {
    const challenge = progress.find((p) => p.challengeId === challengeId);
    if (!challenge) return 0;

    const challengeData = CHALLENGES.find((c) => c.id === challengeId);
    if (!challengeData) return 0;

    return Math.min((challenge.progress / challengeData.target) * 100, 100);
  };

  const isChallengeCompleted = (challengeId: string): boolean => {
    return progress.find((p) => p.challengeId === challengeId)?.completed || false;
  };

  const getCompletedCount = (): number => {
    return progress.filter((p) => p.completed).length;
  };

  return (
    <div className="space-y-6">
      {/* Weekly Stats */}
      <motion.div
        className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/50 border border-cyan-500/40 rounded-xl hover:border-cyan-400/60 transition-all shadow-lg shadow-cyan-500/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span> This Week's Progress
        </h3>
        <div className="flex items-center gap-6">
          <motion.div
            className="text-5xl font-bold bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent"
            whileHover={{ scale: 1.1 }}
          >
            {getCompletedCount()}/{CHALLENGES.length}
          </motion.div>
          <div className="flex-1">
            <p className="text-gray-300 mb-3 font-medium">Challenges Completed</p>
            <div className="h-3 bg-slate-900/50 rounded-full overflow-hidden border border-slate-700/50">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 shadow-lg shadow-cyan-500/50"
                initial={{ width: 0 }}
                animate={{ width: `${(getCompletedCount() / CHALLENGES.length) * 100}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CHALLENGES.map((challenge, index) => {
          const isCompleted = isChallengeCompleted(challenge.id);
          const progressPercent = getProgressPercentage(challenge.id);
          const challengeProgress = progress.find(
            (p) => p.challengeId === challenge.id
          );

          return (
            <motion.div
              key={challenge.id}
              className={`p-6 rounded-xl border transition-all backdrop-blur-sm ${
                isCompleted
                  ? 'bg-gradient-to-br from-green-500/30 to-emerald-500/20 border-green-500/60 shadow-lg shadow-green-500/20'
                  : 'bg-gradient-to-br from-slate-800/80 to-slate-900/50 border-cyan-500/40 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{challenge.icon}</span>
                    <h4 className="text-lg font-semibold text-white">
                      {challenge.title}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-400">{challenge.description}</p>
                </div>

                {isCompleted && (
                  <motion.div
                    className="text-2xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    ✅
                  </motion.div>
                )}
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm font-semibold text-cyan-300">
                    {challengeProgress?.progress || 0}/{challenge.target}
                  </span>
                </div>

                <div className="h-2 bg-slate-900/50 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${
                      isCompleted
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                        : 'bg-gradient-to-r from-cyan-400 to-fuchsia-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Reward */}
              <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-yellow-500/30">
                <p className="text-xs text-gray-400 mb-1">Reward</p>
                <p className="text-sm font-semibold text-yellow-300">
                  {challenge.reward}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Completion Message */}
      {getCompletedCount() === CHALLENGES.length && (
        <motion.div
          className="p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-lg text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-2xl mb-2">🎉</p>
          <p className="text-lg font-semibold text-yellow-300">
            Amazing! You've completed all challenges this week!
          </p>
          <p className="text-sm text-gray-300 mt-2">
            Come back next week for new challenges!
          </p>
        </motion.div>
      )}
    </div>
  );
}

