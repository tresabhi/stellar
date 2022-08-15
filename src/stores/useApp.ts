import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Snippet } from './useSnippets';

export enum TAB {
  CREATE,
  LAYOUT,
  STAGING,
  EXPORT,
}
export enum TOOL {
  MOVE,
  PAN,
}
export enum POPUP {
  ADD_PART,
}

export interface UseApp {
  fileHandle?: FileSystemFileHandle;
  hasUnsavedChanges: boolean;

  tab: TAB;
  popup: POPUP | null;

  tool: TOOL;
  isPanning: boolean;
  isInteractingWithUI: boolean;

  preventNextSelection: boolean;
  clipboard?: Snippet;
}

export const UseAppData: UseApp = {
  fileHandle: undefined,
  hasUnsavedChanges: false,

  tab: TAB.CREATE,
  popup: null,

  tool: TOOL.MOVE,
  isPanning: false,
  isInteractingWithUI: false,

  preventNextSelection: false,
  clipboard: undefined,
};

const useApp = create<UseApp, [['zustand/subscribeWithSelector', never]]>(
  subscribeWithSelector(() => UseAppData),
);
export default useApp;
