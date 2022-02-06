import { Languages } from 'hooks/useTransformations';
import { merge } from 'lodash';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface SettingsStore {
  debug: {
    load_dummy_on_Launch: boolean;
  };
  performance: {
    regress_amount: number;
  };
  language: Languages;
}

export const SettingsStoreData: SettingsStore = {
  debug: {
    load_dummy_on_Launch: false,
  },
  performance: {
    regress_amount: 1,
  },
  language: 'english_us',
};

const settingsStore = create<SettingsStore>(
  devtools(
    persist(() => SettingsStoreData, {
      name: 'settings',
      merge: (persistedState, currentState) =>
        merge(currentState, persistedState),
    }),
    { name: 'settings' },
  ),
);
export default settingsStore;
