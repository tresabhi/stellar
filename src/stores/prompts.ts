import { ReactNode } from 'react';
import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface PromptProps {
  id: string;
}

export interface Prompt {
  id: string;
  dismissByBlur: boolean;
  node: ReactNode;
}

export type UsePrompts = {
  prompts: Prompt[];
};

const usePrompts = create<
UsePrompts,
[['zustand/subscribeWithSelector', never]]
>(subscribeWithSelector(() => ({ prompts: [] } as UsePrompts)));
export default usePrompts;
