import { merge } from 'lodash';
import create from 'zustand';
import { persist } from 'zustand/middleware';

const data = {
  debug: {
    loadDummyOnLaunch: false,
  },
};

type Settings = typeof data & {};

export default create(
  persist(() => data, {
    name: 'settings',
    merge: (persistedState, currentState) =>
      merge(currentState, persistedState),
  }),
);
