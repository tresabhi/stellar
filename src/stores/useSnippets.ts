import { merge } from 'lodash';
import { AnyPartMap } from 'types/Parts';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface Snippet {
  parts: AnyPartMap;
  partOrder: string[];
}

export interface SnippetListing {
  label: string;
  lastModified: number;
  snippet: Snippet;
}

export interface UseSnippets {
  snippets: SnippetListing[];
}

export const SnippetData: Snippet = {
  parts: new Map(),
  partOrder: [],
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
