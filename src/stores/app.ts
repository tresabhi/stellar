import create from 'zustand';
import { devtools } from 'zustand/middleware';

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

const appStore = create<AppStore>(
  devtools(() => AppStoreData, { name: 'app_state' }),
);
export default appStore;
