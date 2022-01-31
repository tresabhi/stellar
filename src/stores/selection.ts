import { PartAddress } from 'types/Blueprint';
import create from 'zustand';

export interface SelectionStore {
  selections: PartAddress[];
  lastSelection?: PartAddress;
}

export const SettingsStoreData: SelectionStore = {
  selections: [],
};

const selectionStore = create<SelectionStore>(() => SettingsStoreData);
export default selectionStore;
