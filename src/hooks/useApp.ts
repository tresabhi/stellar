import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export enum TAB {
  LAYOUT,
  STAGING,
  EXPORT,
}
export enum TOOL {
  MOVE,
  PAN,
}

export interface UseApp {
  fileHandle?: FileSystemFileHandle;
  hasUnsavedChanges: boolean;

  tab: TAB;

  tool: TOOL;
  isPanning: boolean;

  preventNextSelection: boolean;
}

export const UseAppData: UseApp = {
  hasUnsavedChanges: false,

  tab: TAB.LAYOUT,

  tool: TOOL.MOVE,
  isPanning: false,

  preventNextSelection: false,
};

const useApp = create<
  UseApp,
  SetState<UseApp>,
  GetState<UseApp>,
  Mutate<StoreApi<UseApp>, [['zustand/subscribeWithSelector', never]]>
>(subscribeWithSelector(() => UseAppData));
export default useApp;
