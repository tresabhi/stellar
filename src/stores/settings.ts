import { Languages } from 'hooks/useTranslations';
import { merge } from 'lodash';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface SettingsStore {
  debug: {
    dev_blueprint?: string;
    orbit_controls: boolean;
    error_logs: boolean;
  };

  performance: {
    regress_amount: number;
  };

  language: Languages;

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
}

export const SettingsStoreData: SettingsStore = {
  debug: {
    orbit_controls: false,
    error_logs: false,
  },

  performance: {
    regress_amount: 1,
  },

  language: 'english_us',

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
};

const settingsStore = create<SettingsStore>(
  persist(() => SettingsStoreData, {
    name: 'settings',
    merge: (persistedState, currentState) =>
      merge(currentState, persistedState),
  }),
);
export default settingsStore;
