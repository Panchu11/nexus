"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TEAM_MEMBERS } from "@/data/team";
import TeamOrb from "@/components/TeamOrb";
import BackgroundParticles from "@/components/BackgroundParticles";
import ThemeToggle from "@/components/ThemeToggle";
import { Sparkles, BarChart3, Trophy, Target } from "lucide-react";

export default function Home() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Background */}
      <BackgroundParticles />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-violet-950/20 via-black to-black pointer-events-none" />

      {/* Header Navigation */}
      <motion.header
        className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-cyan-500/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-400/50 hover:border-cyan-300 transition-colors flex-shrink-0">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-white font-bold text-lg">NEXUS</span>
          </div>

          <nav className="flex items-center gap-4">
            <Link href="/analytics">
              <motion.button
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">Analytics</span>
              </motion.button>
            </Link>

            <Link href="/leaderboard">
              <motion.button
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Trophy className="w-4 h-4" />
                <span className="text-sm">Leaderboard</span>
              </motion.button>
            </Link>

            <Link href="/challenges">
              <motion.button
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Target className="w-4 h-4" />
                <span className="text-sm">Challenges</span>
              </motion.button>
            </Link>

            <ThemeToggle />
          </nav>
        </div>
      </motion.header>

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <motion.section
          className="flex flex-col items-center justify-center px-4 py-32 md:py-40 text-center min-h-[calc(100vh-80px)]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-cyan-400/60 hover:border-cyan-300 transition-colors mx-auto shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50">
              <img
                src="/logo.jpg"
                alt="Sentient Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Animated Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-cyan-500/50"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">
              Meet the Minds Behind Sentient AGI
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              NEXUS
            </span>
            <br />
            <span className="text-white">Team Appreciation Board</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8"
          >
            A living wall of appreciation for the people shaping the frontier of open intelligence.
            <br />
            <span className="text-cyan-300 font-semibold">
              Write something about them — your words power their orbit.
            </span>
          </motion.p>


        </motion.section>

        {/* Team Section */}
        <section
          id="team"
          className="relative pt-32 pb-20 px-4 w-full flex justify-center"
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div key={member.id} variants={itemVariants} className="flex justify-center items-start">
                <TeamOrb member={member} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Footer */}
        <motion.footer
          className="relative py-12 px-4 text-center border-t border-cyan-500/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400 mb-2">
            Built with ❤️ by Panchu for the Sentient AGI community
          </p>
          <p className="text-sm text-gray-500">
            Your appreciation is shared globally with everyone
          </p>
        </motion.footer>
      </div>
    </main>
  );
}
