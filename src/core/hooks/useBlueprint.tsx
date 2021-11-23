import * as BlueprintAPI from 'core/APIs/blueprint';
import * as RootBlueprint from 'core/APIs/blueprint/root';
import * as GroupPart from 'core/APIs/parts/group';
import * as RootPart from 'core/APIs/parts/root';
import DeepPartial from 'core/types/DeepPartial';
import { merge } from 'lodash';
import { useState } from 'react';

export default function useBlueprint(initialBlueprint: Object) {
  const [state, setState] = useState(
    BlueprintAPI.updateBlueprint(initialBlueprint),
  );
  let selection: RootBlueprint.partAddresses = [];

  // let lastSelectionAddress: RootBlueprint.partAddress = [];

  const hook = {
    state,
    setState,

    selection,

    deleteParts: (addresses: RootBlueprint.partAddresses) => {
      setState((state) => {
        addresses.forEach((address) => {
          let followedAddress = state.parts;

          address.forEach((addressIndex, index) => {
            if (index + 1 === address.length) {
              // last item; the part to modify
              followedAddress.splice(addressIndex, 1);
            } else {
              followedAddress = (
                followedAddress[addressIndex] as GroupPart.type
              ).parts;
            }
          });
        });

        return { ...state };
      });
    },

    deletePartsBySelection: () => {},

    mutatePartsData: (
      data: DeepPartial<RootPart.anyPartType>,
      addresses: RootBlueprint.partAddresses,
    ) => {
      setState((state) => {
        // assign new object pointer to force rerender
        let newState = { ...state, parts: [...state.parts] };

        addresses.forEach((address) => {
          let followedParts = newState.parts;

          address.forEach((addressValue, index) => {
            // last part of address, it's the part to mutate
            if (index + 1 === address.length) {
              // assign new object pointer to force rerender
              followedParts[addressValue] = {
                ...merge(followedParts[addressValue], data),
              };
            } else {
              let groupPart = followedParts[addressValue] as GroupPart.type;

              // assign new object pointer to force rerender
              followedParts[addressValue] = {
                ...groupPart,
                parts: [...groupPart.parts],
              };
              followedParts = groupPart.parts;
            }
          });
        });

        return newState;
      });
    },

    mutatePartsBySelection: (data: DeepPartial<RootPart.anyPartType>) => {
      hook.mutatePartsData(data, hook.selection);
    },

    selectParts: (
      type: RootBlueprint.selectionType,
      address: RootBlueprint.partAddress,
    ) => {
      if (type === 'single') {
        hook.deselectAllParts();
        hook.selection = [address];
        hook.mutatePartsData({ '.stellar': { selected: true } }, [address]);
      }
    },

    deselectAllParts: () => {
      hook.mutatePartsBySelection({ '.stellar': { selected: false } });
      hook.selection = [];
    },
  };

  return hook;
}
