import * as BlueprintAPI from 'core/API/blueprint';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import * as GroupPart from 'core/API/part/types/group';
import * as RootPart from 'core/API/part/types/root';
import DeepPartial from 'core/types/DeepPartial';
import { merge } from 'lodash';
import { useState } from 'react';

export default function useBlueprint(initialBlueprint: Object) {
  let updatedBlueprint = BlueprintAPI.updateBlueprint(initialBlueprint);
  const [state, setState] = useState(updatedBlueprint);

  const hook = {
    _mutableState: updatedBlueprint,
    get mutableState() {
      return this._mutableState;
    },
    set mutableState(value) {
      this._mutableState = { ...value };
      this.setState(this._mutableState);
    },

    state,
    setState,

    createParts: () => {},
    deleteParts: (addresses: RootBlueprint.partAddresses) => {},
    mutateParts: (
      data: DeepPartial<RootPart.anyPartType>,
      addresses: RootBlueprint.partAddresses,
    ) => {
      let localMutableState = hook.mutableState;

      addresses.forEach((address) => {
        let currentParts = localMutableState.parts;

        address.forEach((direction, index) => {
          if (address.length === index + 1) {
            currentParts[direction] = {
              ...merge(currentParts[direction], data),
            };
          } else {
            currentParts[direction] = { ...currentParts[direction] };
            currentParts = (currentParts[direction] as GroupPart.type).parts;
          }
        });
      });

      hook.mutableState = localMutableState;
    },

    selectParts: (
      type: RootBlueprint.selectionType,
      address: RootBlueprint.partAddress,
    ) => {},
  };

  return hook;
}
