import blueprintStore from 'core/stores/blueprint';
import selectionStore from 'core/stores/selection';
import { Blueprint, PartAddress } from 'core/types/Blueprint';
import { AnyPart } from 'core/types/Parts';
import produce from 'immer';
import { BlueprintData, importifyBlueprint } from 'interfaces/blueprint';
import { cloneDeep, merge } from 'lodash';

/**
 * Hook to manage the blueprint state
 * @returns blueprint hook
 */
export default function useBlueprint() {
  const hook = {
    new: (blueprint = {}) =>
      blueprintStore.setState(
        merge(importifyBlueprint(cloneDeep(blueprint)), BlueprintData),
      ),

    deleteParts: (parts: AnyPart[]) =>
      blueprintStore.setState(
        produce((state: Blueprint) => {
          parts.forEach((part) => {
            let mutableParts = part.relations.parent?.parts ?? state.parts;

            mutableParts.splice(mutableParts.indexOf(part));
          });
        }),
      ),

    deletePartsBySelection: () =>
      hook.deleteParts(selectionStore.getState().selections),

    getPartAddress: (data: AnyPart) => {
      const blueprintState = blueprintStore.getState();
      let address: PartAddress = [];
      let currentPart: AnyPart = data;

      while (currentPart.relations.parent) {
        const currentParent = currentPart.relations.parent;

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
    ): AnyPart | undefined =>
      blueprintStore((state) => {
        let currentParent: GroupType | RootBlueprint.Type = state;

        for (let index = 0; index < address.length; index++) {
          const direction = address[index];

          if (index === address.length - 1) {
            return currentParent.parts[direction];
          } else {
            currentParent = currentParent.parts[direction] as GroupType;
          }
        }
      }),
  };

  return hook;
}

export type BlueprintHook = ReturnType<typeof useBlueprint>;
export type UseBlueprintHook = typeof useBlueprint;
