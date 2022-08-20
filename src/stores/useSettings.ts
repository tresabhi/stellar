import { merge } from 'lodash';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export enum SidebarTab {
  Left,
  Right,
}

export enum InterfaceMode {
  Compact,
  Comfortable,
}

export interface UseSettings {
  debug: {
    dev_blueprint?: string;
    error_logs: boolean;
  };

  performance: {
    regress_amount: number;
  };

  interface: {
    mode: InterfaceMode | null; // null is auto detect
    language: string;

    tabs: {
      layout: {
        leftSideBar: {
          visible: boolean;
          tab: SidebarTab;
        };

        rightSideBar: {
          visible: {
            inCompactMode: boolean;
            inComfortableMode: boolean;
          };
          tab: SidebarTab;
          scaleConstrained: boolean;
        };
      };
    };
  };
}

export const UseSettingsData: UseSettings = {
  debug: {
    error_logs: false,
  },

  performance: {
    regress_amount: 1,
  },

  interface: {
    mode: null,
    language: 'en-US',

    tabs: {
      layout: {
        leftSideBar: {
          visible: true,
          tab: SidebarTab.Left,
        },

        rightSideBar: {
          visible: {
            inCompactMode: false,
            inComfortableMode: true,
          },
          tab: SidebarTab.Left,
          scaleConstrained: false,
        },
      },
    },
  },
};

const useSettings = create<UseSettings, [['zustand/persist', UseSettings]]>(
  persist(() => UseSettingsData, {
    name: 'settings',
    merge: (persistedState, currentState) =>
      merge(currentState, persistedState),
  }),
);
export default useSettings;
