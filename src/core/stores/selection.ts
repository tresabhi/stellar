import * as RootBlueprint from 'core/API/blueprint/types/root';
import create from 'zustand';

type SelectionStoreType = {
  selections: Partial<RootBlueprint.PartPointers>;
  lastSelection?: RootBlueprint.PartPointer;
};

export default create<SelectionStoreType>(() => ({
  selections: [],
}));
