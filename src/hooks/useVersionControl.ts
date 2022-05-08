import { Patch } from 'immer';
import create from 'zustand';

export interface VersionItem {
  undo: Patch[];
  redo: Patch[];
}

export interface UseVersionControl {
  index: number;
  history: VersionItem[];
}

const useVersionControl = create<UseVersionControl>(() => ({
  index: -1,
  history: [],
}));
export default useVersionControl;
