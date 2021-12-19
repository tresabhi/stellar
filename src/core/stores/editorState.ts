import create from 'zustand';

export const data = {
  name: 'blueprint',
  hasUnsavedChanges: false,
};

// TODO: capitalize all types and interfaces
export interface type {}

export default create<type>(() => data);
