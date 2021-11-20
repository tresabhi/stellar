import * as BlueprintAPI from 'core/APIs/blueprint';
import * as RootBlueprint from 'core/APIs/blueprint/root';
import * as RootPart from 'core/APIs/parts/root';
import * as GroupPart from 'core/APIs/parts/group';
import { merge } from 'lodash';
import { useState } from 'react';
import DeepPartial from 'core/types/DeepPartial';

export default function useBlueprint(initialBlueprint: Object) {
  const [state, setState] = useState(
    BlueprintAPI.updateBlueprint(initialBlueprint),
  );
  let selection: RootBlueprint.partAddresses = [];

  return {
    state,
    selection,

    deleteParts: (addresses: RootBlueprint.partAddresses) => {
      let newState = { ...state };

      addresses.forEach((address) => {
        let followedAddress = newState.parts;

        address.forEach((addressIndex, index) => {
          if (index + 1 === address.length) {
            // last item; the part to modify
            followedAddress.splice(addressIndex, 1);
          } else {
            followedAddress = (followedAddress[addressIndex] as GroupPart.type)
              .parts;
          }
        });
      });

      // TODO: maybe try functional update here for efficiency?
      setState(newState);
    },

    mutatePartsData: (
      data: DeepPartial<RootPart.anyPartType>,
      addresses: RootBlueprint.partAddresses,
    ) => {
      let newState = { ...state };

      addresses.forEach((address) => {
        let followedAddress = newState.parts;

        address.forEach((addressIndex, index) => {
          if (index + 1 === address.length) {
            // last item; the part to modify
            followedAddress[addressIndex] = merge(
              followedAddress[addressIndex],
              data,
            );
          } else {
            followedAddress = (followedAddress[addressIndex] as GroupPart.type)
              .parts;
          }
        });
      });

      // TODO: maybe try functional update here for efficiency?
      setState(newState);
    },
  };
}
