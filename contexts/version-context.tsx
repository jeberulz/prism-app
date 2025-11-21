'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AppVersion = 'v1' | 'v2';

interface VersionContextType {
  version: AppVersion;
  toggleVersion: () => void;
  setVersion: (version: AppVersion) => void;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export function VersionProvider({ children }: { children: ReactNode }) {
  const [version, setVersionState] = useState<AppVersion>('v1');

  // Load version from localStorage on mount
  useEffect(() => {
    const savedVersion = localStorage.getItem('prism-app-version') as AppVersion;
    if (savedVersion === 'v1' || savedVersion === 'v2') {
      setVersionState(savedVersion);
    }
  }, []);

  // Save version to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('prism-app-version', version);
  }, [version]);

  const toggleVersion = () => {
    setVersionState((prev) => (prev === 'v1' ? 'v2' : 'v1'));
  };

  const setVersion = (newVersion: AppVersion) => {
    setVersionState(newVersion);
  };

  return (
    <VersionContext.Provider value={{ version, toggleVersion, setVersion }}>
      {children}
    </VersionContext.Provider>
  );
}

export function useVersion() {
  const context = useContext(VersionContext);
  if (context === undefined) {
    throw new Error('useVersion must be used within a VersionProvider');
  }
  return context;
}

