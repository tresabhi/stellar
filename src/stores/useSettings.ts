import { RenamePartsOptions } from 'core/part/renameParts';
import { merge } from 'lodash';
import { theme, themeDark } from 'stitches.config';
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

type Theme = typeof theme;

export const themes = new Map<string, Theme>([
  ['theme-dark', themeDark as Theme],
]);

export interface UseSettings {
  debug: {
    error_logs: boolean;
  };

  performance: {
    regress_amount: number;
  };

  interface: {
    mode: InterfaceMode | null; // null is auto detect
    language: string;
    theme?: string;
    hasShownSplashScreen: boolean;

    tabs: {
      layout: {
        leftSidebar: {
          visible: boolean;
          tab: SidebarTab;
        };

        rightSidebar: {
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

  editor: {
    rename: RenamePartsOptions;
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
    theme: themeDark.toString(),
    hasShownSplashScreen: false,

    tabs: {
      layout: {
        leftSidebar: {
          visible: true,
          tab: SidebarTab.Left,
        },

        rightSidebar: {
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

  editor: {
    rename: {
      trim: true,
      skipLocked: true,
      suffix: false,
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
