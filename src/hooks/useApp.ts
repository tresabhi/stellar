import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface UseApp {
  fileHandle?: FileSystemFileHandle;
  hasUnsavedChanges: boolean;

  tab: 'layout' | 'staging' | 'simulation' | 'rendering';

  transformationMode: 'translate' | 'rotate' | 'scale';
}

export const UseAppData: UseApp = {
  hasUnsavedChanges: false,

  tab: 'layout',

  transformationMode: 'rotate',
};

const useApp = create<
  UseApp,
  SetState<UseApp>,
  GetState<UseApp>,
  Mutate<StoreApi<UseApp>, [['zustand/subscribeWithSelector', never]]>
>(subscribeWithSelector(() => UseAppData));
export default useApp;
