import { Languages } from 'hooks/useTranslations';
import { merge } from 'lodash';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface SettingsStore {
  debug: {
    load_dev_blueprint_on_launch: boolean;
    enabled_orbit_controls: boolean;
  };
  performance: {
    regress_amount: number;
  };
  language: Languages;
}

export const SettingsStoreData: SettingsStore = {
  debug: {
    load_dev_blueprint_on_launch: false,
    enabled_orbit_controls: false,
  },
  performance: {
    regress_amount: 1,
  },
  language: 'english_us',
};

const settingsStore = create<SettingsStore>(
  persist(() => SettingsStoreData, {
    name: 'settings',
    merge: (persistedState, currentState) =>
      merge(currentState, persistedState),
  }),
);
export default settingsStore;
