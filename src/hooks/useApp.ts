import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export type TabType = 'layout' | 'staging' | 'simulation' | 'rendering';
export type ToolType = 'transform' | 'pan';

export interface UseApp {
  fileHandle?: FileSystemFileHandle;
  hasUnsavedChanges: boolean;

  tab: TabType;

  tool: ToolType;
  isPanning: boolean;
  isTranslating: boolean;

  preventNextSelection: boolean;
}

export const UseAppData: UseApp = {
  hasUnsavedChanges: false,

  tab: 'layout',

  tool: 'transform',
  isPanning: false,
  isTranslating: false,

  preventNextSelection: false,
};

const useApp = create<
  UseApp,
  SetState<UseApp>,
  GetState<UseApp>,
  Mutate<StoreApi<UseApp>, [['zustand/subscribeWithSelector', never]]>
>(subscribeWithSelector(() => UseAppData));
export default useApp;
