import { OrthographicCamera } from 'three';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Snippet } from './snippets';

export enum Tab {
  Create,
  Layout,
  Staging,
  Export,
}

export enum Tool {
  Pan,
  Transform,
  Edit,
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
    isInteracting: boolean;
    orientationPromptDismissed: boolean;
    focusMode: boolean;
    newPopupsEnabled: boolean;
    snippetSelection?: number;
  };

  editor: {
    selectMultiple: boolean;
    selectDeep: boolean;
    snap: boolean;
    scaleWithRatio: boolean;
    tool: Tool;
    isSpacePanning: boolean;
    isTouchPanning: boolean;
    isInteractingWithPart: boolean;
    preventNextSelection: boolean;
    clipboard?: Snippet;
    camera?: OrthographicCamera;
    canvas?: HTMLCanvasElement;
  };
}

export const UseAppData: UseApp = {
  file: {
    handle: undefined,
    hasUnsavedChanges: false,
  },

  interface: {
    tab: Tab.Create,
    isInteracting: false,
    orientationPromptDismissed: false,
    focusMode: false,
    newPopupsEnabled: true,
    snippetSelection: undefined,
  },

  editor: {
    selectMultiple: false,
    selectDeep: false,
    snap: true,
    scaleWithRatio: false,
    tool: Tool.Transform,
    isSpacePanning: false,
    isTouchPanning: false,
    isInteractingWithPart: false,
    preventNextSelection: false,
    clipboard: undefined,
    camera: undefined,
    canvas: undefined,
  },
};

const useApp = create<UseApp, [['zustand/subscribeWithSelector', never]]>(
  subscribeWithSelector(() => UseAppData),
);
export default useApp;
