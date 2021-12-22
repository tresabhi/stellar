import create from 'zustand';

export const data = {
  name: 'blueprint',
  hasUnsavedChanges: false,

  tab: 'layout' as 'layout' | 'staging' | 'simulation' | 'rendering',
};

// TODO: capitalize all types and interfaces
export type type = typeof data;

export default create<type>(() => data);
