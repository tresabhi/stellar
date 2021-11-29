import * as BlueprintAPI from 'core/API/blueprint';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import * as GroupPart from 'core/API/part/types/group';
import * as RootPart from 'core/API/part/types/root';
import DeepPartial from 'core/types/DeepPartial';
import { merge } from 'lodash';
import { useState } from 'react';

export default function useBlueprint(initialBlueprint: Object) {
  const [stateExternal, setStateExternal] = useState(
    BlueprintAPI.updateBlueprint(initialBlueprint),
  );

  const hook = {
    state: stateExternal,
    setState: setStateExternal,

    selection: [] as RootBlueprint.partAddresses,
    lastSelection: [] as RootBlueprint.partAddress,

    /**
     * TODO: delete parts in descending index order to avoid deleting
     * already offset parts
     */
    deleteParts: (addresses: RootBlueprint.partAddresses) => {
      if (addresses.length > 0) {
        hook.setState((state) => {
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

    /**
     * no funtionality ...yet!
     */
    deletePartsBySelection: () => {},

    mutateParts: (
      data: DeepPartial<RootPart.anyPartType>,
      addresses: RootBlueprint.partAddresses,
    ) => {
      if (addresses.length > 0) {
        hook.setState((state) => {
          addresses.forEach((address) => {
            let followedParts = state.parts;

            address.forEach((addressValue, index) => {
              // last part of address, it's the part to mutate
              if (index + 1 === address.length) {
                followedParts[addressValue] = {
                  ...merge(followedParts[addressValue], data),
                };
              } else {
                const groupPart = followedParts[addressValue] as GroupPart.type;

                followedParts[addressValue] = { ...groupPart };
                followedParts = groupPart.parts;
              }
            });
          });

          return { ...state };
        });
      }
    },

    mutatePartsBySelection: (data: DeepPartial<RootPart.anyPartType>) => {
      hook.mutateParts(data, hook.selection);
    },

    selectParts: (
      type: RootBlueprint.selectionType,
      address: RootBlueprint.partAddress,
    ) => {
      if (type === 'single') {
        hook.deselectAllParts();
        hook.selection = [address];
        hook.mutatePartsBySelection({ '.stellar': { selected: true } });
      } else if (type === 'multi') {
        // check if it's already selected
        if (!hook.isPartSelected(address)) {
          hook.selection.push(address);
          hook.mutateParts({ '.stellar': { selected: true } }, [address]);
        } else {
          // deselect it
        }
      }

      document.querySelector('.explorer-container.right')!.innerHTML =
        JSON.stringify(hook.selection);
    },

    deselectAllParts: () => {
      hook.mutatePartsBySelection({ '.stellar': { selected: false } });
      hook.selection = [];
    },

    getPartsByAddresses: (addresses: RootBlueprint.partAddresses) => {
      let returnArray: RootBlueprint.anyPartTypeArray = [];

      addresses.forEach((address) => {
        let followedParts = hook.state.parts;

        address.forEach((addressValue, index) => {
          if (index + 1 === address.length) {
            returnArray.push(followedParts[addressValue]);
          } else {
            followedParts = (followedParts[addressValue] as GroupPart.type)
              .parts;
          }
        });
      });

      return returnArray;
    },

    isPartSelected: (address: RootBlueprint.partAddress) =>
      hook.getPartsByAddresses([address])[0]['.stellar'].selected,
  };

  return hook;
}
