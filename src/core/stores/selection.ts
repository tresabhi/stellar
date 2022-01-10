import * as RootPart from 'core/API/part/types/root';
import create from 'zustand';

export type SelectionStoreType = {
  selections: RootPart.AnyPartType[];
  lastSelection?: RootPart.AnyPartType;
};

export default create<SelectionStoreType>(() => ({
  selections: [],
}));
