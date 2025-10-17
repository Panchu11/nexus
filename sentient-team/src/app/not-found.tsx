import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden text-white flex items-center justify-center">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-violet-950/20 via-black to-black pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <p className="text-xl text-gray-300 mb-2">Page Not Found</p>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link href="/">
          <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Go Home
          </button>
        </Link>
      </div>
    </main>
  );
}

