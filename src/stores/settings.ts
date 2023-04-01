import { RenamePartsOptions } from 'core/part/rename';
import { cloneDeep, merge } from 'lodash';
import { theme } from 'stitches.config';
import themeDark from 'stitches.config/themes/dark';
import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { Tab } from './app';

export enum SidebarTab {
  Left,
  Right,
}

type Theme = typeof theme;

export const THEMES: Record<string, Theme> = {
  'theme-dark': themeDark as Theme,
};

export interface UseSettings {
  debug: {
    errorScreen: {
      showDebug: boolean;
    };
  };

  interface: {
    touchscreenMode: boolean | null;
    language: string;
    theme: string | null;
    showOrientationPrompt: boolean;
    showInstallationPrompt: boolean;
    showInstabilityWarning: boolean;
    showMissingParts: boolean;
    welcomePromptCompleted: boolean;
    defaultTab: Tab;

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
          scaleConstrain: boolean;
        };
      };
    };
  };

  editor: {
    undoLimit: number;
    rename: RenamePartsOptions;
    constrainScales: boolean;
    constrainFuelTankWidths: boolean;
  };

  file: {
    format: boolean;
    watermark: boolean;
    defaultName: string;
  };
}

export const useSettingsData: UseSettings = {
  debug: {
    errorScreen: {
      showDebug: false,
    },
  },

  interface: {
    touchscreenMode: null,
    language: 'en-US',
    theme: themeDark.toString(),
    showOrientationPrompt: true,
    showInstallationPrompt: true,
    showInstabilityWarning: true,
    showMissingParts: true,
    welcomePromptCompleted: false,
    defaultTab: Tab.Create,

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
          scaleConstrain: false,
        },
      },
    },
  },

  editor: {
    undoLimit: 512,
    rename: {
      trim: true,
      skipLocked: true,
      suffix: false,
    },
    constrainScales: true,
    constrainFuelTankWidths: true,
  },

  file: {
    format: false,
    watermark: true,
    defaultName: 'Blueprint',
  },
};

const useSettings = create<
  UseSettings,
  [['zustand/subscribeWithSelector', never], ['zustand/persist', UseSettings]]
>(
  subscribeWithSelector(
    persist(() => cloneDeep(useSettingsData), {
      name: 'settings',
      merge: (persistedState, currentState) =>
        merge(currentState, persistedState),
    }),
  ),
);
export default useSettings;
