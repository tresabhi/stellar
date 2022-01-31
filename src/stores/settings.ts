import { merge } from 'lodash';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface SettingsStore {
  debug: {
    loadDummyOnLaunch: boolean;
  };
}

export const SettingsStoreData: SettingsStore = {
  debug: {
    loadDummyOnLaunch: false,
  },
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
