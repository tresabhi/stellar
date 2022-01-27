import UUID from 'core/types/UUID';
import create from 'zustand';

export type SelectionStoreType = {
  selections: UUID[];
  lastSelection?: UUID;
};

const selectionStore = create<SelectionStoreType>(() => ({
  selections: [],
}));
export default selectionStore;
