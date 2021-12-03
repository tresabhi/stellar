import * as RootBlueprint from 'core/API/blueprint/types/root';
import * as RootPart from 'core/API/part/types/root';
import * as blueprintStore from 'core/stores/blueprint';

export default function (store: blueprintStore.type) {
  const hook = {
    selection: [] as RootBlueprint.partAddresses,
    lastSelection: [] as RootBlueprint.partAddress,

    createParts: () => store.setState((state) => {}),

    deleteParts: (addresses: RootBlueprint.partAddresses) =>
      store.setState((state) => {}),

    mutateParts: (
      data: RootPart.anyPartialPartType,
      addresses: RootBlueprint.partAddresses,
    ) => store.setState((state) => {}),

    selectParts: (
      type: RootBlueprint.selectionType,
      address: RootBlueprint.partAddress,
    ) => {},
  };

  return hook;
}
