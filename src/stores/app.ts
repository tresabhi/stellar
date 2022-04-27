import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface AppStore {
  fileHandle?: FileSystemFileHandle;
  hasUnsavedChanges: boolean;

  tab: 'layout' | 'staging' | 'simulation' | 'rendering';

  transformationMode: 'translate' | 'rotate' | 'scale';
}

export const AppStoreData: AppStore = {
  hasUnsavedChanges: false,

  tab: 'layout',

  transformationMode: 'rotate',
};

const appStore = create<
  AppStore,
  SetState<AppStore>,
  GetState<AppStore>,
  Mutate<StoreApi<AppStore>, [['zustand/subscribeWithSelector', never]]>
>(subscribeWithSelector(() => AppStoreData));
export default appStore;
