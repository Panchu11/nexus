'use client';

import { AnalyticsData } from '@/utils/analytics';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

interface AnalyticsChartsProps {
  data: AnalyticsData;
}

const COLORS = ['#00d9ff', '#ff006e', '#8338ec', '#ffbe0b', '#fb5607', '#3a86ff'];

export default function AnalyticsCharts({ data }: AnalyticsChartsProps) {
  return (
    <div className="space-y-8">
      {/* Total Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/50 border border-cyan-500/40 rounded-xl hover:border-cyan-400/60 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
          whileHover={{ y: -5 }}
        >
          <p className="text-gray-400 text-sm font-medium">Total Appreciations</p>
          <p className="text-4xl font-bold text-cyan-300 mt-3">
            {data.totalAppreciations}
          </p>
          <div className="mt-3 h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded-full" />
        </motion.div>

        <motion.div
          className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/50 border border-fuchsia-500/40 rounded-xl hover:border-fuchsia-400/60 transition-all hover:shadow-lg hover:shadow-fuchsia-500/20"
          whileHover={{ y: -5 }}
        >
          <p className="text-gray-400 text-sm font-medium">Top Member</p>
          <p className="text-2xl font-bold text-fuchsia-300 mt-3">
            {data.memberStats[0]?.memberName || 'N/A'}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {data.memberStats[0]?.count || 0} appreciations
          </p>
          <div className="mt-3 h-1 bg-gradient-to-r from-fuchsia-500 to-transparent rounded-full" />
        </motion.div>

        <motion.div
          className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/50 border border-purple-500/40 rounded-xl hover:border-purple-400/60 transition-all hover:shadow-lg hover:shadow-purple-500/20"
          whileHover={{ y: -5 }}
        >
          <p className="text-gray-400 text-sm font-medium">Top Appreciator</p>
          <p className="text-2xl font-bold text-purple-300 mt-3">
            {data.topAppreciators[0]?.xHandle || 'N/A'}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {data.topAppreciators[0]?.count || 0} appreciations
          </p>
          <div className="mt-3 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
        </motion.div>
      </motion.div>

      {/* Member Rankings */}
      <motion.div
        className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/50 border border-cyan-500/40 rounded-xl hover:border-cyan-400/60 transition-all"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">📊</span> Member Rankings
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.memberStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="memberName" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #00d9ff',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="count" fill="#00d9ff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Daily Trend */}
      {data.dailyTrend.length > 0 && (
        <motion.div
          className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/50 border border-cyan-500/40 rounded-xl hover:border-cyan-400/60 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">📈</span> Daily Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.dailyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #00d9ff',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#00d9ff"
                strokeWidth={3}
                dot={{ fill: '#00d9ff', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Top Words */}
      {data.wordFrequency.length > 0 && (
        <motion.div
          className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/50 border border-cyan-500/40 rounded-xl hover:border-cyan-400/60 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">💬</span> Top Words
          </h3>
          <div className="flex flex-wrap gap-3">
            {data.wordFrequency.slice(0, 15).map((item, index) => (
              <motion.span
                key={item.word}
                className="px-4 py-2 rounded-full text-sm font-semibold border transition-all hover:scale-110"
                style={{
                  backgroundColor: COLORS[index % COLORS.length] + '20',
                  color: COLORS[index % COLORS.length],
                  borderColor: COLORS[index % COLORS.length] + '60',
                  fontSize: `${12 + (item.count / data.wordFrequency[0].count) * 8}px`,
                }}
                whileHover={{ scale: 1.1 }}
              >
                {item.word} ({item.count})
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

