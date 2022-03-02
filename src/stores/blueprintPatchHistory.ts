import { Patch } from 'immer';
import create from 'zustand';

export interface BlueprintPatchHistoryStore {
  index: number;
  patches: {
    undo: Patch[];
    redo: Patch[];
  }[];
}

const blueprintPatchHistoryStore = create<BlueprintPatchHistoryStore>(() => ({
  index: -1,
  patches: [],
}));
export default blueprintPatchHistoryStore;
