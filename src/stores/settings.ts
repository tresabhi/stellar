import { RenamePartsOptions } from 'core/part/renameParts';
import { merge } from 'lodash';
import { theme, themeDark } from 'stitches.config';
import create from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

export enum SidebarTab {
  Left,
  Right,
}

export enum InterfaceMode {
  Compact,
  Comfortable,
}

type Theme = typeof theme;

export const THEMES = new Map<string, Theme>([
  ['theme-dark', themeDark as Theme],
]);

export interface UseSettings {
  debug: {
    errorScreen: {
      showDebug: boolean;
    };
  };

  performance: {
    regressAmount: number;
  };

  interface: {
    mode: InterfaceMode | null; // null is auto detect
    language: string;
    theme: string | null;
    showOrientationPrompt: boolean;
    welcomePromptCompleted: boolean;

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
    selectMultiple: boolean;
    selectDeep: boolean;
    undoLimit: number;
    rename: RenamePartsOptions;
    constraintScales: boolean;
    constraintFuelTankWidths: boolean;
  };
}

export const UseSettingsData: UseSettings = {
  debug: {
    errorScreen: {
      showDebug: false,
    },
  },

  performance: {
    regressAmount: 1,
  },

  interface: {
    mode: null,
    language: 'en-US',
    theme: themeDark.toString(),
    showOrientationPrompt: true,
    welcomePromptCompleted: false,

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
    selectMultiple: false,
    selectDeep: false,
    undoLimit: 512,
    rename: {
      trim: true,
      skipLocked: true,
      suffix: false,
    },
    constraintScales: true,
    constraintFuelTankWidths: true,
  },
};

const useSettings = create<
  UseSettings,
  [['zustand/subscribeWithSelector', never], ['zustand/persist', UseSettings]]
>(
  subscribeWithSelector(
    persist(() => UseSettingsData, {
      name: 'settings',
      merge: (persistedState, currentState) =>
        merge(currentState, persistedState),
    }),
  ),
);
export default useSettings;
