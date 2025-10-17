"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TeamMember } from "@/data/team";
import { database } from "@/utils/database";
import OrbModal from "./OrbModal";
import { ExternalLink } from "lucide-react";

interface TeamOrbProps {
  member: TeamMember;
  index: number;
}

export default function TeamOrb({ member, index }: TeamOrbProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    // Initial load
    updateProgress();

    // Listen for storage changes
    const handleStorageChange = () => {
      updateProgress();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const updateProgress = async () => {
    const count = await database.getAppreciationCount(member.id);
    setCommentCount(count);
    const progressPercent = await database.getProgressPercentage(member.id);
    setProgress(progressPercent);
  };

  // Floating animation with random offset
  const floatingVariants = {
    animate: {
      y: [0, -30, 0],
      x: [0, 15, 0],
      transition: {
        duration: 6 + index * 0.5,
        repeat: Infinity,
      },
    },
  };

  // Hover scale effect
  const hoverVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <motion.div
        className="flex flex-col items-center"
        variants={floatingVariants}
        animate="animate"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        {/* Orb Container */}
        <motion.div
          className="relative cursor-pointer group"
          variants={hoverVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => setIsOpen(true)}
        >
          {/* Glow Effect */}
          <div
            className={`absolute inset-0 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 bg-gradient-to-r ${member.color}`}
            style={{ width: "140px", height: "140px", margin: "-20px" }}
          />

          {/* Orb */}
          <div
            className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-transparent bg-gradient-to-r ${member.color} p-1 shadow-lg`}
          >
            {/* Inner circle with avatar */}
            <div className="w-full h-full rounded-full bg-black/80 overflow-hidden flex items-center justify-center border border-white/10">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient avatar with initials
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              {/* Fallback Avatar with Initials */}
              <div
                className={`absolute inset-0 flex items-center justify-center text-2xl font-bold text-white bg-gradient-to-br ${member.color}`}
                style={{ display: "none" }}
                id={`fallback-${member.id}`}
              >
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>
          </div>

          {/* Progress Ring */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ filter: "drop-shadow(0 0 8px rgba(162, 0, 255, 0.3))" }}
          >
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="3"
              strokeDasharray={`${2 * Math.PI * 0.48 * 100} ${2 * Math.PI * 0.48 * 100}`}
              strokeDashoffset={`${2 * Math.PI * 0.48 * 100 * (1 - progress / 100)}`}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 2 * Math.PI * 0.48 * 100 }}
              animate={{
                strokeDashoffset: 2 * Math.PI * 0.48 * 100 * (1 - progress / 100),
              }}
              transition={{ duration: 0.5 }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d9ff" />
                <stop offset="100%" stopColor="#a200ff" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Team Member Info */}
        <motion.div
          className="mt-6 text-center max-w-xs"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          <h3 className="text-lg md:text-xl font-bold text-white mb-1">
            {member.name}
          </h3>
          <p className="text-sm text-cyan-300/80 mb-3">{member.designation}</p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                {commentCount}
              </div>
              <div className="text-xs text-gray-400">Appreciations</div>
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                {Math.round(progress)}%
              </div>
              <div className="text-xs text-gray-400">Progress</div>
            </div>
          </div>

          {/* X Profile Button */}
          <a
            href={member.x}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-cyan-200 transition-all duration-300 text-sm font-medium group"
          >
            View X Profile
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <OrbModal
        member={member}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          updateProgress();
        }}
      />
    </>
  );
}

