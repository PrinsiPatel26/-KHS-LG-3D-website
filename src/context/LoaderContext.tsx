import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type LoaderPhase = 'loading' | 'completing' | 'done';

interface LoaderContextType {
  phase: LoaderPhase;
  markCompleting: () => void;
  markDone: () => void;
}

const LoaderContext = createContext<LoaderContextType>({
  phase: 'done',
  markCompleting: () => {},
  markDone: () => {}
});

export function LoaderProvider({
  children,
  initialPhase = 'loading'
}: {
  children: ReactNode;
  initialPhase?: LoaderPhase;
}) {
  const [phase, setPhase] = useState<LoaderPhase>(initialPhase);

  const markCompleting = useCallback(() => {
    setPhase((prev) => (prev === 'loading' ? 'completing' : prev));
  }, []);

  const markDone = useCallback(() => {
    setPhase('done');
  }, []);

  return (
    <LoaderContext.Provider value={{ phase, markCompleting, markDone }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}
