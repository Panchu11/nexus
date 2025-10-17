"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TeamMember } from "@/data/team";
import { database, Comment } from "@/utils/database";
import { X, Send, ExternalLink, Share2, Download } from "lucide-react";
import { BADGES } from "@/data/badges";
import AppreciationCard from "./AppreciationCard";

interface OrbModalProps {
  member: TeamMember;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrbModal({ member, isOpen, onClose }: OrbModalProps) {
  const [xHandle, setXHandle] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"comments" | "card">("comments");
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadComments();
    }
  }, [isOpen, member.id]);

  const loadComments = async () => {
    setIsLoading(true);
    try {
      const data = await database.getComments(member.id);
      setComments(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      await database.addComment(member.id, xHandle, message);
      await loadComments();
      setMessage("");
      setXHandle("");
      // Trigger storage event for other components
      window.dispatchEvent(new Event("storage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShareToX = (comment: Comment) => {
    const text = `I appreciate ${member.name} for: "${comment.message}"`;
    const encodedText = encodeURIComponent(text);
    const url = `https://x.com/intent/tweet?text=${encodedText}&url=https://sentient-team.vercel.app`;
    window.open(url, "_blank");
    // Update share count
    database.markAsSharedOnX(comment.id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-black border border-cyan-500/30 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${member.color} p-6 relative`}>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden flex-shrink-0">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                    <div
                      className={`w-full h-full flex items-center justify-center text-xl font-bold text-white bg-gradient-to-br ${member.color}`}
                      style={{ display: "none" }}
                    >
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white">{member.name}</h2>
                    <p className="text-white/80">{member.designation}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto flex flex-col">
                {/* Tabs */}
                <div className="flex gap-2 p-4 border-b border-cyan-500/20 bg-slate-900/50">
                  <button
                    onClick={() => setActiveTab("comments")}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      activeTab === "comments"
                        ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    💬 Comments
                  </button>
                  <button
                    onClick={() => setActiveTab("card")}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      activeTab === "card"
                        ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    🎨 Card
                  </button>
                </div>

                {/* Form & Comments */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {activeTab === "comments" ? (
                    <>
                      {/* Form */}
                      <div className="p-6 border-b border-cyan-500/20">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-cyan-300 mb-2">
                            Your X Handle (optional)
                          </label>
                          <input
                            type="text"
                            placeholder="@yourhandle"
                            value={xHandle}
                            onChange={(e) => setXHandle(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-cyan-300 mb-2">
                            Your Appreciation
                          </label>
                          <textarea
                            placeholder="Share your appreciation for this team member..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                          />
                          <p className="text-xs text-gray-400 mt-1">
                            {message.length} characters
                          </p>
                        </div>

                        <button
                          type="submit"
                          disabled={!message.trim() || isSubmitting}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300"
                        >
                          <Send className="w-4 h-4" />
                          {isSubmitting ? "Submitting..." : "Submit Appreciation"}
                        </button>
                      </form>
                    </div>

                    {/* Comments Feed */}
                    <div className="flex-1 overflow-y-auto p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Appreciations ({comments.length})
                      </h3>

                      {isLoading ? (
                        <div className="text-center py-8 text-gray-400">
                          <p>Loading appreciations...</p>
                        </div>
                      ) : comments.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          <p>No appreciations yet. Be the first to share!</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {[...comments].reverse().map((comment) => (
                            <motion.div
                              key={comment.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-4 bg-slate-800/50 border border-cyan-500/20 rounded-lg hover:border-cyan-500/40 transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                                  {comment.x_handle.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm font-semibold text-cyan-300">
                                      {comment.x_handle}
                                    </p>
                                    <motion.button
                                      onClick={() => handleShareToX(comment)}
                                      className="p-1 hover:bg-cyan-500/20 rounded transition-colors"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                      title="Share on X"
                                    >
                                      <Share2 className="w-4 h-4 text-cyan-400" />
                                    </motion.button>
                                  </div>
                                  <p className="text-sm text-gray-300 mt-1 break-words">
                                    {comment.message}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-2">
                                    {new Date(comment.created_at).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                    </>
                  ) : (
                    /* Card Tab */
                    <div className="flex-1 overflow-y-auto p-6">
                      {comments.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          <p>No appreciations yet. Submit one first!</p>
                        </div>
                      ) : (
                        <AppreciationCard
                          memberName={member.name}
                          message={comments[comments.length - 1].message}
                          xHandle={comments[comments.length - 1].x_handle}
                          memberColor={member.color}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-cyan-500/20 bg-slate-900/50">
                <a
                  href={member.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                >
                  Follow on X
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

