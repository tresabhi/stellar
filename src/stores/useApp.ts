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

export interface UseApp {
  file: {
    handle?: FileSystemFileHandle;
    hasUnsavedChanges: boolean;
  };

  interface: {
    tab: Tab;
    popup: Popup;
    isInteracting: boolean;
  };

  editor: {
    tool: Tool;
    isSpacePanning: boolean;
    isTouchPanning: boolean;
    selectMultiple: boolean;
    preventNextSelection: boolean;
    clipboard?: Snippet;
    camera?: Camera;
  };

  loadStatus: {
    'TODO: add loading list here': boolean;
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
  },

  editor: {
    tool: Tool.Move,
    isSpacePanning: false,
    isTouchPanning: false,
    selectMultiple: false,
    preventNextSelection: false,
    clipboard: undefined,
    camera: undefined,
  },

  loadStatus: {
    'TODO: add loading list here': true,
  },
};

const useApp = create<UseApp, [['zustand/subscribeWithSelector', never]]>(
  subscribeWithSelector(() => UseAppData),
);
export default useApp;
