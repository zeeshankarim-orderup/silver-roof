'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Direction, Locale } from '@/types';

interface DirectionContextValue {
  locale: Locale;
  dir: Direction;
  /** +1 in LTR, -1 in RTL. Multiply any x-axis offset by this. */
  axis: number;
}

const DirectionContext = createContext<DirectionContextValue>({
  locale: 'en',
  dir: 'ltr',
  axis: 1,
});

export function DirectionProvider({
  locale,
  dir,
  children,
}: {
  locale: Locale;
  dir: Direction;
  children: ReactNode;
}) {
  return (
    <DirectionContext.Provider value={{ locale, dir, axis: dir === 'rtl' ? -1 : 1 }}>
      {children}
    </DirectionContext.Provider>
  );
}

/** Lets client-side motion mirror correctly in Arabic without duplicating components. */
export function useDirection(): DirectionContextValue {
  return useContext(DirectionContext);
}
