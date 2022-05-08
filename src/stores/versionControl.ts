import { Patch } from 'immer';
import create from 'zustand';

export interface PatchHistoryItem {
  undo: Patch[];
  redo: Patch[];
}

export interface VersionControlStore {
  index: number;
  history: PatchHistoryItem[];
}

const versionControlStore = create<VersionControlStore>(() => ({
  index: -1,
  history: [],
}));
export default versionControlStore;
