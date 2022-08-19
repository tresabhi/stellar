import { merge } from 'lodash';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export enum SidebarTab {
  Left,
  Right,
}

export interface UseSettings {
  debug: {
    dev_blueprint?: string;
    error_logs: boolean;
  };

  performance: {
    regress_amount: number;
  };

  layout: {
    leftSideBar: {
      visible: boolean;
      tab: SidebarTab;
    };

    rightSideBar: {
      visible: boolean;
      tab: SidebarTab;
      scaleConstrained: boolean;
    };
  };

  language: string;
}

export const UseSettingsData: UseSettings = {
  debug: {
    error_logs: false,
  },

  performance: {
    regress_amount: 1,
  },

  layout: {
    leftSideBar: {
      visible: true,
      tab: SidebarTab.Left,
    },

    rightSideBar: {
      visible: true,
      tab: SidebarTab.Left,
      scaleConstrained: false,
    },
  },

  language: 'en-US',
};

const useSettings = create<UseSettings, [['zustand/persist', UseSettings]]>(
  persist(() => UseSettingsData, {
    name: 'settings',
    merge: (persistedState, currentState) =>
      merge(currentState, persistedState),
  }),
);
export default useSettings;
