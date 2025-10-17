'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Twitter } from 'lucide-react';
import {
  generateAppreciationCard,
  downloadImage,
  shareImage,
} from '@/utils/cardGenerator';

interface AppreciationCardProps {
  memberName: string;
  message: string;
  xHandle: string;
  memberColor: string;
}

export default function AppreciationCard({
  memberName,
  message,
  xHandle,
  memberColor,
}: AppreciationCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [cardImage, setCardImage] = useState<string | null>(null);

  const handleGenerateCard = async () => {
    setIsGenerating(true);
    try {
      const date = new Date().toLocaleDateString();
      const image = await generateAppreciationCard({
        memberName,
        message,
        xHandle,
        date,
        memberColor,
      });
      setCardImage(image);
    } catch (error) {
      console.error('Error generating card:', error);
      alert('Failed to generate card');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (cardImage) {
      downloadImage(cardImage, `appreciation-${memberName}.png`);
    }
  };

  const handleShare = async () => {
    if (cardImage) {
      await shareImage(cardImage, memberName);
    }
  };

  const handleShareToX = () => {
    const text = `I appreciate ${memberName} for: "${message}"\n\n🌟 Check out the Sentient Team Appreciation Board!\n\n#SentientAGI #Appreciation`;
    const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(xUrl, '_blank', 'width=550,height=420');
  };

  return (
    <div className="space-y-4">
      {!cardImage ? (
        <motion.button
          onClick={handleGenerateCard}
          disabled={isGenerating}
          className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 disabled:opacity-50 text-white font-semibold transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isGenerating ? 'Generating...' : '🎨 Generate Card'}
        </motion.button>
      ) : (
        <>
          <div className="relative rounded-lg overflow-hidden border border-cyan-500/30">
            <img
              src={cardImage}
              alt="Appreciation Card"
              className="w-full h-auto"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <motion.button
              onClick={handleDownload}
              className="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-300 font-semibold transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title="Download card as PNG"
            >
              <Download className="w-4 h-4" />
              Download
            </motion.button>

            <motion.button
              onClick={handleShareToX}
              className="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 font-semibold transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title="Share on X"
            >
              <Twitter className="w-4 h-4" />
              Share on X
            </motion.button>

            <motion.button
              onClick={handleShare}
              className="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-300 font-semibold transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title="Share card"
            >
              <Share2 className="w-4 h-4" />
              Share
            </motion.button>

            <motion.button
              onClick={() => setCardImage(null)}
              className="flex-1 min-w-[100px] px-4 py-2 rounded-lg bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/50 text-gray-300 font-semibold transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title="Go back"
            >
              Back
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}

