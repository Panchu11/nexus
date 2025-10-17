'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import LeaderboardTable from '@/components/LeaderboardTable';
import BackgroundParticles from '@/components/BackgroundParticles';
import {
  getMostAppreciatedMembers,
  getMostActiveAppreciators,
  TimeRange,
} from '@/utils/leaderboard';

export default function LeaderboardPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [members, setMembers] = useState<any[]>([]);
  const [appreciators, setAppreciators] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [membersData, appreciatorsData] = await Promise.all([
          getMostAppreciatedMembers(timeRange),
          getMostActiveAppreciators(timeRange),
        ]);
        setMembers(membersData);
        setAppreciators(appreciatorsData);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [timeRange]);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden text-white">
      {/* Background */}
      <BackgroundParticles />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-violet-950/20 via-black to-black pointer-events-none" />

      {/* Header */}
      <motion.header
        className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-cyan-500/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <motion.button
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
              🏆 Leaderboards
            </h1>
          </div>

          {/* Time Range Filter */}
          <div className="flex gap-2">
            {(['week', 'month', 'all'] as TimeRange[]).map((range) => (
              <motion.button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  timeRange === range
                    ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400'
                    : 'bg-slate-800/50 text-gray-400 hover:text-white border border-slate-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {range === 'week' && 'This Week'}
                {range === 'month' && 'This Month'}
                {range === 'all' && 'All Time'}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 md:py-24 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-5xl">
          {isLoading ? (
            <div className="text-center py-16">
              <motion.div
                className="inline-block"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full" />
              </motion.div>
              <p className="text-gray-400 mt-4">Loading leaderboards...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <LeaderboardTable
                  entries={members}
                  title="🌟 Most Appreciated Members"
                  type="members"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <LeaderboardTable
                  entries={appreciators}
                  title="👥 Most Active Appreciators"
                  type="appreciators"
                />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

