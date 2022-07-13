import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Snippet } from './useSnippets';

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
  clipboard?: Snippet;
}

export const UseAppData: UseApp = {
  fileHandle: undefined,
  hasUnsavedChanges: false,

  tab: TAB.LAYOUT,

  tool: TOOL.MOVE,
  isPanning: false,

  preventNextSelection: false,
  clipboard: undefined,
};

const useApp = create<
  UseApp,
  SetState<UseApp>,
  GetState<UseApp>,
  Mutate<StoreApi<UseApp>, [['zustand/subscribeWithSelector', never]]>
>(subscribeWithSelector(() => UseAppData));
export default useApp;
