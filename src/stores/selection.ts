import create from 'zustand';

export interface SelectionStore {
  selections: string[];
  lastSelection?: string;
}

export const SettingsStoreData: SelectionStore = {
  selections: [],
};

const selectionStore = create<SelectionStore>(() => SettingsStoreData);
export default selectionStore;
