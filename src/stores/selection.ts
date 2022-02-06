import { PartAddress } from 'types/Blueprint';
import create, { GetState, SetState } from 'zustand';
import {
  StoreApiWithSubscribeWithSelector,
  subscribeWithSelector,
} from 'zustand/middleware';

export interface SelectionStore {
  selections: PartAddress[];
  lastSelection?: PartAddress;
}

export const SettingsStoreData: SelectionStore = {
  selections: [],
};

const selectionStore = create<
  SelectionStore,
  SetState<SelectionStore>,
  GetState<SelectionStore>,
  StoreApiWithSubscribeWithSelector<SelectionStore>
>(subscribeWithSelector(() => SettingsStoreData));
export default selectionStore;
