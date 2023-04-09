import { Part } from 'game/parts/Part';
import { merge } from 'lodash';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Snippet {
  parts: Record<string, Part>;
  part_order: string[];
}

export interface SnippetListing {
  image: string;
  label: string;
  created: number;
  snippet: Snippet;
}

export interface UseSnippets {
  snippets: SnippetListing[];
}

export const SnippetData: Snippet = {
  parts: {},
  part_order: [],
};

export const useSnippetsData: UseSnippets = { snippets: [] };

const useSnippets = create<UseSnippets, [['zustand/persist', UseSnippets]]>(
  persist(() => useSnippetsData, {
    name: 'snippets',
    merge: (persistedState, currentState) =>
      merge(currentState, persistedState),
  }),
);
export default useSnippets;
