import * as RootBlueprint from 'core/API/blueprint/types/root';
import * as GroupPart from 'core/API/part/types/group';
import * as RootPart from 'core/API/part/types/root';
import store from 'core/stores/blueprint';
import { merge } from 'lodash';

export default function useBlueprint() {
  const hook = {
    selection: [] as RootBlueprint.partAddresses,
    lastSelection: [] as RootBlueprint.partAddress,

    createParts: () => store.setState((state) => {}),

    deleteParts: (addresses: RootBlueprint.partAddresses) =>
      store.setState((state) => {
        // TODO: sort addresses first to avoid deleting shifted parts
        // ...or we could utilize the tree selection system
        const newParts = [...state.parts];

        addresses.forEach((address) => {
          let currentParts = newParts;

          address.forEach((direction, index) => {
            if (index + 1 === address.length) {
              currentParts.splice(direction, 1);
            } else {
              currentParts[direction] = { ...currentParts[direction] };
              currentParts = (currentParts[direction] as GroupPart.type).parts;
            }
          });
        });

        return { parts: newParts };
      }),

    mutateParts: (
      data: RootPart.anyPartialPartType,
      addresses: RootBlueprint.partAddresses,
    ) =>
      store.setState((state) => {
        const newParts = [...state.parts];

        addresses.forEach((address) => {
          let currentParts = newParts;

          address.forEach((direction, index) => {
            if (index + 1 === address.length) {
              currentParts[direction] = {
                ...merge(currentParts[direction], data),
              };
            } else {
              currentParts[direction] = { ...currentParts[direction] };
              currentParts = (currentParts[direction] as GroupPart.type).parts;
            }
          });
        });

        return { parts: newParts };
      }),

    selectParts: (
      type: RootBlueprint.selectionType,
      address: RootBlueprint.partAddress,
    ) => {
      if (type === 'multi') {
      }
    },
  };

  return hook;
}
