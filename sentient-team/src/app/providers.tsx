'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR/prerendering, just render children without ThemeProvider
  if (!mounted && typeof window === 'undefined') {
    return <>{children}</>;
  }

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}

