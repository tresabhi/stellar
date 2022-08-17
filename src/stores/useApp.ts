import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Snippet } from './useSnippets';

export enum Tab {
  Create,
  Layout,
  Staging,
  Export,
}
export enum Tool {
  Move,
  Pan,
}
export enum Popup {
  InsertPart,
}

export interface UseApp {
  fileHandle?: FileSystemFileHandle;
  hasUnsavedChanges: boolean;

  tab: Tab;
  popup: Popup | null;

  tool: Tool;
  isPanning: boolean;
  isInteractingWithUI: boolean;

  preventNextSelection: boolean;
  clipboard?: Snippet;
}

export const UseAppData: UseApp = {
  fileHandle: undefined,
  hasUnsavedChanges: false,

  tab: Tab.Create,
  popup: null,

  tool: Tool.Move,
  isPanning: false,
  isInteractingWithUI: false,

  preventNextSelection: false,
  clipboard: undefined,
};

const useApp = create<UseApp, [['zustand/subscribeWithSelector', never]]>(
  subscribeWithSelector(() => UseAppData),
);
export default useApp;
