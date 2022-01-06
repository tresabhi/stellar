import { merge } from 'lodash';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const data = {
  debug: {
    loadDummyOnLaunch: false,
  },
};

export type SettingsType = typeof data & {};

export default create<SettingsType>(
  devtools(
    persist(() => data, {
      name: 'settings',
      merge: (persistedState, currentState) =>
        merge(currentState, persistedState),
    }),
    { name: 'settings' },
  ),
);
