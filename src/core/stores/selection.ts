import * as RootPart from 'core/parts/Root';
import create from 'zustand';

export type SelectionStoreType = {
  selections: RootPart.AnyPartType[];
  lastSelection?: RootPart.AnyPartType;
};

export default create<SelectionStoreType>(() => ({
  selections: [],
}));
