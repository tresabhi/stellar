import { importifyBlueprint } from 'core/API/blueprint';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import * as GroupPart from 'core/API/part/types/group';
import * as RootPart from 'core/API/part/types/root';
import blueprintStore from 'core/stores/blueprint';
import selectionStore from 'core/stores/selection';
import produce from 'immer';
import { cloneDeep, merge } from 'lodash';

/**
 * Hook to manage the blueprint state
 * @returns blueprint hook
 */
export default function useBlueprint() {
  const hook = {
    new: (blueprint = {}) =>
      blueprintStore.setState(
        merge(importifyBlueprint(cloneDeep(blueprint)), RootBlueprint.data),
      ),

    deleteParts: (parts: RootPart.AnyPartType[]) =>
      blueprintStore.setState(
        produce((state: RootBlueprint.Type) => {
          parts.forEach((part) => {
            let mutableParts =
              part.relations.parentPointer?.parts ?? state.parts;

            mutableParts.splice(mutableParts.indexOf(part));
          });
        }),
      ),

    deletePartsBySelection: () =>
      hook.deleteParts(selectionStore.getState().selections),

    getPartAddress: (data: RootPart.AnyPartType) => {
      const blueprintState = blueprintStore.getState();
      let address: RootBlueprint.PartAddress = [];
      let currentPart: RootPart.AnyPartType = data;

      while (currentPart.relations.parentPointer) {
        const currentParent = currentPart.relations.parentPointer;

        address = [currentParent.parts.indexOf(currentPart), ...address];
        currentPart = currentParent;
      }
      address = [blueprintState.parts.indexOf(currentPart), ...address];

      // @ts-ignore
      window.a = blueprintState.parts[0];
      // @ts-ignore
      window.b = currentPart;
      // @ts-ignore
      window.parts = blueprintState.parts;

      console.log(blueprintState.parts.indexOf(currentPart));

      return address;
    },

    getReactivePartByAddress: (
      address: RootBlueprint.PartAddress,
    ): RootPart.AnyPartType | undefined =>
      blueprintStore((state) => {
        let currentParent: GroupPart.Type | RootBlueprint.Type = state;

        for (let index = 0; index < address.length; index++) {
          const direction = address[index];

          if (index === address.length - 1) {
            return currentParent.parts[direction];
          } else {
            currentParent = currentParent.parts[direction] as GroupPart.Type;
          }
        }
      }),
  };

  return hook;
}

export type BlueprintHook = ReturnType<typeof useBlueprint>;
export type UseBlueprintHook = typeof useBlueprint;
