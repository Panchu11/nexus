'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ChallengeBoard from '@/components/ChallengeBoard';
import BackgroundParticles from '@/components/BackgroundParticles';
import { getChallengeProgress } from '@/utils/challenges';

export default function ChallengesPage() {
  const [progress, setProgress] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userHandle, setUserHandle] = useState('');

  useEffect(() => {
    // Get user handle from localStorage or use default
    const handle = localStorage.getItem('userHandle') || 'Anonymous';
    setUserHandle(handle);

    const loadProgress = async () => {
      setIsLoading(true);
      try {
        const challengeProgress = await getChallengeProgress(handle);
        setProgress(challengeProgress);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, []);

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
          <div className="flex items-center gap-4">
            <Link href="/">
              <motion.button
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                🎯 Weekly Challenges
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Complete challenges to earn badges and boost engagement!
              </p>
            </div>
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
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full" />
              </motion.div>
              <p className="text-gray-400 mt-4">Loading challenges...</p>
            </div>
          ) : (
            <>
              <ChallengeBoard progress={progress} />

              {/* Info Box */}
              <motion.div
                className="mt-12 p-6 bg-slate-800/50 border border-cyan-500/30 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-white mb-3">💡 How It Works</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>✅ Complete challenges to earn badges</li>
                  <li>✅ Challenges reset every Monday</li>
                  <li>✅ Share your progress on X for bonus points</li>
                  <li>✅ Compete with other team members</li>
                  <li>✅ Build appreciation habits</li>
                </ul>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

