import { importifyBlueprint } from 'core/modules/blueprint';
import * as RootBlueprint from 'core/modules/blueprint/types/root';
import { GroupType } from 'core/parts/Group';
import * as RootPart from 'core/parts/Root';
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
            let mutableParts = part.relations.parent?.parts ?? state.parts;

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
    ): RootPart.AnyPartType | undefined =>
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
