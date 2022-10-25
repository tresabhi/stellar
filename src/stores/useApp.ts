import { Camera } from 'three';
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
  None,
  InsertPart,
  RenameParts,
}

export interface LoadStatus {
  message: string;
  done: boolean;
}

export interface UseApp {
  file: {
    handle?: FileSystemFileHandle;
    hasUnsavedChanges: boolean;
  };

  interface: {
    tab: Tab;
    popup: Popup;
    isInteracting: boolean;
    orientationPromptDismissed: boolean;
  };

  editor: {
    tool: Tool;
    isSpacePanning: boolean;
    isTouchPanning: boolean;
    preventNextSelection: boolean;
    clipboard?: Snippet;
    camera?: Camera;
    invalidateFrame?: () => void;
  };
}

export const UseAppData: UseApp = {
  file: {
    handle: undefined,
    hasUnsavedChanges: false,
  },

  interface: {
    tab: Tab.Create,
    popup: Popup.None,
    isInteracting: false,
    orientationPromptDismissed: false,
  },

  editor: {
    tool: Tool.Move,
    isSpacePanning: false,
    isTouchPanning: false,
    preventNextSelection: false,
    clipboard: undefined,
    camera: undefined,
    invalidateFrame: undefined,
  },
};

const useApp = create<UseApp, [['zustand/subscribeWithSelector', never]]>(
  subscribeWithSelector(() => UseAppData),
);
export default useApp;
