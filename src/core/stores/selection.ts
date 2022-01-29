import create from 'zustand';

export type SelectionStoreType = {
  selections: string[];
  lastSelection?: string;
};

const selectionStore = create<SelectionStoreType>(() => ({
  selections: [],
}));
export default selectionStore;
