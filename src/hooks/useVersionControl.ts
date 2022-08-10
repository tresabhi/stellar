import { Patch } from 'immer';
import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface VersionItem {
  undo: Patch[];
  redo: Patch[];
}

export interface UseVersionControl {
  index: number;
  history: VersionItem[];
}

export const UseVersionControlData: UseVersionControl = {
  index: -1,
  history: [],
};

const useVersionControl = create<
  UseVersionControl,
  [['zustand/subscribeWithSelector', never]]
>(subscribeWithSelector(() => UseVersionControlData));
export default useVersionControl;
