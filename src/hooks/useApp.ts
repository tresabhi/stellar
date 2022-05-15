import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export type TabType = 'layout' | 'staging' | 'simulation' | 'rendering';
export type TransformationToolType = 'translate' | 'rotate' | 'scale';

export interface UseApp {
  fileHandle?: FileSystemFileHandle;
  hasUnsavedChanges: boolean;

  tab: TabType;

  transformationMode: TransformationToolType;
}

export const UseAppData: UseApp = {
  hasUnsavedChanges: false,

  tab: 'layout',

  transformationMode: 'translate',
};

const useApp = create<
  UseApp,
  SetState<UseApp>,
  GetState<UseApp>,
  Mutate<StoreApi<UseApp>, [['zustand/subscribeWithSelector', never]]>
>(subscribeWithSelector(() => UseAppData));
export default useApp;
