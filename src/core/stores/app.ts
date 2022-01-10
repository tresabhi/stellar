import create from 'zustand';
import { devtools } from 'zustand/middleware';

export const data = {
  name: 'blueprint',
  hasUnsavedChanges: false,

  tab: 'layout' as 'layout' | 'staging' | 'simulation' | 'rendering',
  layout: {
    leftSideBar: {
      partition: 'parts' as 'parts' | 'snippets',
      visible: true,
    },
    rightSideBar: {
      partition: 'properties' as 'properties' | 'inspect',
      visible: true,
    },
  },
};

// TODO: capitalize all types and interfaces
export type AppType = typeof data;

export default create<AppType>(devtools(() => data, { name: 'app_state' }));
