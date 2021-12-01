import * as BlueprintAPI from 'core/API/blueprint';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import * as GroupPart from 'core/API/part/types/group';
import * as RootPart from 'core/API/part/types/root';
import { merge } from 'lodash';
import create, { SetState } from 'zustand';

export default function useBlueprint(blueprint: object) {
  let setStore: SetState<RootBlueprint.type>;
  const useStore = create<RootBlueprint.type>((set) => {
    setStore = set;
    return BlueprintAPI.updateBlueprint(blueprint);
  });

  const hook = {
    state: useStore((state) => state),
    setState: setStore!,

    createParts: () => {},
    deleteParts: (addresses: RootBlueprint.partAddresses) => {},
    mutateParts: (
      data: RootPart.anyPartialPartType,
      addresses: RootBlueprint.partAddresses,
    ) => {
      const newParts = [...hook.state.parts];

      addresses.forEach((address) => {
        let currentParts = newParts;

        address.forEach((direction, index) => {
          if (index + 1 === address.length) {
            // TODO: check for matching `n` values then only merge
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
    },

    selectParts: (
      type: RootBlueprint.selectionType,
      address: RootBlueprint.partAddress,
    ) => {},
  };

  return hook;
}
