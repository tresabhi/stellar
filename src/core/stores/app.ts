import create from 'zustand';
import { devtools } from 'zustand/middleware';

export const data = {
  name: 'blueprint',
  hasUnsavedChanges: false,

  tab: 'layout' as 'layout' | 'staging' | 'simulation' | 'rendering',
  layout: {
    leftSideBar: {
      visible: true,
      partition: 'parts' as 'parts' | 'snippets',
    },

    rightSideBar: {
      visible: true,
      partition: 'properties' as 'properties' | 'inspect',
      scaleConstrained: false,
    },
  },
};

// TODO: capitalize all types and interfaces
export type AppType = typeof data;

export default create<AppType>(devtools(() => data, { name: 'app_state' }));
