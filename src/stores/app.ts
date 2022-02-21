import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface AppStore {
  name: string;
  hasUnsavedChanges: boolean;

  tab: 'layout' | 'staging' | 'simulation' | 'rendering';
  layout: {
    leftSideBar: {
      visible: boolean;
      partition: 'parts' | 'snippets';
    };

    rightSideBar: {
      visible: boolean;
      partition: 'properties' | 'inspect';
      scaleConstrained: boolean;
    };
  };

  transformationMode: 'translate' | 'rotate' | 'scale';
}

export const AppStoreData: AppStore = {
  name: 'blueprint',
  hasUnsavedChanges: false,

  tab: 'layout',
  layout: {
    leftSideBar: {
      visible: true,
      partition: 'parts',
    },

    rightSideBar: {
      visible: true,
      partition: 'properties',
      scaleConstrained: false,
    },
  },

  transformationMode: 'rotate',
};

const appStore = create<
  AppStore,
  SetState<AppStore>,
  GetState<AppStore>,
  Mutate<StoreApi<AppStore>, [['zustand/subscribeWithSelector', never]]>
>(subscribeWithSelector(() => AppStoreData));
export default appStore;
