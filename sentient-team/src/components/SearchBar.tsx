'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = 'Search appreciations...',
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`relative flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-300 ${
          isFocused
            ? 'border-cyan-400 bg-slate-900/50 shadow-[0_0_20px_rgba(0,217,255,0.2)]'
            : 'border-cyan-500/30 bg-slate-900/30'
        }`}
      >
        <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />

        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
        />

        {query && (
          <motion.button
            onClick={handleClear}
            className="p-1 hover:bg-cyan-500/20 rounded transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-4 h-4 text-gray-400 hover:text-cyan-400" />
          </motion.button>
        )}
      </div>

      {query && (
        <motion.div
          className="mt-2 text-sm text-gray-400 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Searching for: <span className="text-cyan-300">"{query}"</span>
        </motion.div>
      )}
    </motion.div>
  );
}

