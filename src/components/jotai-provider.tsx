'use client';

import { Provider } from 'jotai';

interface JoitaiProviderProps {
  children: React.ReactNode;
}

export const JotaiProvider = ({ children }: JoitaiProviderProps) => {
  return <Provider>{children}</Provider>;
};
