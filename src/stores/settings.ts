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
            inTouchscreenMode: boolean;
            inDesktopMode: boolean;
          };
          tab: SidebarTab;
          scaleConstrain: boolean;
        };
      };

      staging: {
        leftSidebar: {
          visible: boolean;
          tab: SidebarTab;
        };
        rightSidebar: boolean;
      };
    };
  };

  editor: {
    interiorView: boolean;
    undoLimit: number;
    rename: RenamePartsOptions;
    constrainScales: boolean;
    constrainFuelTankWidths: boolean;
    showCenterOfBuild: boolean;
  };

  file: {
    format: boolean;
    watermark: boolean;
    defaultName: string;
  };
}

export const useSettingsData: UseSettings = {
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
            inTouchscreenMode: false,
            inDesktopMode: true,
          },
          tab: SidebarTab.Left,
          scaleConstrain: false,
        },
      },

      staging: {
        leftSidebar: {
          visible: true,
          tab: SidebarTab.Left,
        },

        rightSidebar: true,
      },
    },
  },

  editor: {
    interiorView: true,
    undoLimit: 512,
    rename: {
      trim: true,
      skipLocked: true,
      suffix: false,
    },
    constrainScales: true,
    constrainFuelTankWidths: true,
    showCenterOfBuild: false,
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
