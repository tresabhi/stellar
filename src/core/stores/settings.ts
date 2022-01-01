import { merge } from 'lodash';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const data = {
  debug: {
    loadDummyOnLaunch: false,
  },
};

type Settings = typeof data & {};

export default create<Settings>(
  devtools(
    persist(() => data, {
      name: 'settings',
      merge: (persistedState, currentState) =>
        merge(currentState, persistedState),
    }),
    { name: 'settings' },
  ),
);
