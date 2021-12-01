import * as BlueprintAPI from 'core/API/blueprint';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import * as RootPart from 'core/API/part/types/root';
import DeepPartial from 'core/types/DeepPartial';
import create, { SetState } from 'zustand';

export default function useBlueprint(initialBlueprint: Object) {
  let setBlueprintStore: SetState<RootBlueprint.type>;
  const useBlueprintStore = create<RootBlueprint.type>((set) => {
    setBlueprintStore = set;
    return BlueprintAPI.updateBlueprint(initialBlueprint);
  });

  const hook = {
    store: useBlueprintStore,
    state: useBlueprintStore((state) => state),
    set: setBlueprintStore!,

    getState: () => hook.store.getState(),
    getReactiveState: () => hook.store((state) => state),

    createParts: () => {},
    deleteParts: (addresses: RootBlueprint.partAddresses) => {},
    mutateParts: (
      data: DeepPartial<RootPart.anyPartType>,
      addresses: RootBlueprint.partAddresses,
    ) => {
      // let newParts = hook.reactiveState;
      hook.set({});
    },

    selectParts: (
      type: RootBlueprint.selectionType,
      address: RootBlueprint.partAddress,
    ) => {},

    getPartData: (address: RootBlueprint.partAddress) => {},
  };

  return hook;
}
