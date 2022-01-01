import create from 'zustand';
import { devtools } from 'zustand/middleware';

export const data = {
  name: 'blueprint',
  hasUnsavedChanges: false,

  tab: 'layout' as 'layout' | 'staging' | 'simulation' | 'rendering',
  layout: {
    leftSideBar: 'parts' as 'parts' | 'snippets',
    rightSideBar: 'properties' as 'properties' | 'inspect',
  },
};

// TODO: capitalize all types and interfaces
export type Type = typeof data;

export default create<Type>(devtools(() => data, { name: 'app_state' }));
