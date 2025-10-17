'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import AnalyticsCharts from '@/components/AnalyticsCharts';
import BackgroundParticles from '@/components/BackgroundParticles';
import { getAnalyticsData, exportAnalyticsAsCSV, AnalyticsData } from '@/utils/analytics';

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const analyticsData = await getAnalyticsData();
        setData(analyticsData);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleExport = () => {
    if (!data) return;

    const csv = exportAnalyticsAsCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

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
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
              📊 Analytics Dashboard
            </h1>
          </div>

          <motion.button
            onClick={handleExport}
            disabled={!data}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 disabled:opacity-50 rounded-lg font-semibold transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            Export CSV
          </motion.button>
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
              <p className="text-gray-400 mt-4">Loading analytics...</p>
            </div>
          ) : data ? (
            <AnalyticsCharts data={data} />
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p>Failed to load analytics data</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

