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
  file: {
    handle?: FileSystemFileHandle;
    hasUnsavedChanges: boolean;
  };

  interface: {
    tab: Tab;
    popup?: Popup;
    isInteracting: boolean;
  };

  editor: {
    tool: Tool;
    isPanning: boolean;
    preventNextSelection: boolean;
    clipboard?: Snippet;
  };
}

export const UseAppData: UseApp = {
  file: {
    handle: undefined,
    hasUnsavedChanges: false,
  },

  interface: {
    tab: Tab.Create,
    popup: undefined,
    isInteracting: false,
  },

  editor: {
    tool: Tool.Move,
    isPanning: false,
    preventNextSelection: false,
    clipboard: undefined,
  },
};

const useApp = create<UseApp, [['zustand/subscribeWithSelector', never]]>(
  subscribeWithSelector(() => UseAppData),
);
export default useApp;
