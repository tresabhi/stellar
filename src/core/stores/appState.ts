import create from 'zustand';

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
export type type = typeof data;

export default create<type>(() => data);
