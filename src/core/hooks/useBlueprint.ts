import { importifyBlueprint } from 'core/API/blueprint';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import * as RootPart from 'core/API/part/types/root';
import blueprintStore from 'core/stores/blueprint';
import { cloneDeep, merge } from 'lodash';

/**
 * Hook to manage the blueprint state
 * @returns blueprint hook
 */
export default function useBlueprint() {
  const hook = {
    deleteParts: () => {},

    new: (blueprint = {}) =>
      blueprintStore.setState(
        merge(importifyBlueprint(cloneDeep(blueprint)), RootBlueprint.data),
      ),

    getPartAddress: (data: RootPart.AnyPartType) => {
      const blueprintState = blueprintStore.getState();
      let address: RootBlueprint.PartAddress = [];
      let currentPart: RootPart.AnyPartType = data;

      while (currentPart.relations.parentPointer) {
        const currentParent = currentPart.relations.parentPointer;

        alert(currentPart.relations !== undefined);

        address = [currentParent.parts.indexOf(currentPart), ...address];
        currentPart = currentParent;
      }
      address = [blueprintState.parts.indexOf(currentPart), ...address];

      return address;
    },
  };

  return hook;
}
