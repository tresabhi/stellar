import * as BlueprintAPI from 'core/API/blueprint';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import * as GroupPart from 'core/API/part/types/group';
import * as RootPart from 'core/API/part/types/root';
import DeepPartial from 'core/types/DeepPartial';
import { merge } from 'lodash';
import { useState } from 'react';

export default function useBlueprint(initialBlueprint: Object) {
  const [state, setState] = useState(
    BlueprintAPI.updateBlueprint(initialBlueprint),
  );

  // let lastSelectionAddress: RootBlueprint.partAddress = [];

  const hook = {
    state,
    setState,

    selection: [] as RootBlueprint.partAddresses,

    /**
     * TODO: delete parts in descending index order to avoid deleting offset
     * parts
     */
    deleteParts: (addresses: RootBlueprint.partAddresses) => {
      if (addresses.length > 0) {
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
      }
    },

    deletePartsBySelection: () => {},

    mutateParts: (
      data: DeepPartial<RootPart.anyPartType>,
      addresses: RootBlueprint.partAddresses,
    ) => {
      if (addresses.length > 0) {
        setState((state) => {
          // assign new object pointer to force rerender
          let newState = { ...state };

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
                followedParts[addressValue] = { ...groupPart };
                followedParts = groupPart.parts;
              }
            });
          });

          return newState;
        });
      }
    },

    mutatePartsBySelection: (data: DeepPartial<RootPart.anyPartType>) =>
      hook.mutateParts(data, hook.selection),

    selectParts: (
      type: RootBlueprint.selectionType,
      address: RootBlueprint.partAddress,
    ) => {
      // alert('before:\n' + JSON.stringify(hook.selection));
      if (type === 'single') {
        hook.deselectAllParts();
        hook.selection = [address];
        hook.mutatePartsBySelection({ '.stellar': { selected: true } });
      }
      // alert('after:\n' + JSON.stringify(hook.selection));

      setInterval(() => {
        document.querySelector('.explorer-container.right')!.innerHTML =
          JSON.stringify(hook.selection);
      });
    },

    deselectAllParts: () => {
      hook.mutatePartsBySelection({ '.stellar': { selected: false } });
      hook.selection = [];
    },
  };

  return hook;
}
