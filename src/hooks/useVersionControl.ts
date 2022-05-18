import { Patch } from 'immer';
import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
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
  SetState<UseVersionControl>,
  GetState<UseVersionControl>,
  Mutate<
    StoreApi<UseVersionControl>,
    [['zustand/subscribeWithSelector', never]]
  >
>(subscribeWithSelector(() => UseVersionControlData));
export default useVersionControl;
