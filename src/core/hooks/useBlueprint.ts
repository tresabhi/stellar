import { importifyBlueprint } from 'core/API/blueprint';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import * as GroupPart from 'core/API/part/types/group';
import * as RootPart from 'core/API/part/types/root';
import blueprintStore from 'core/stores/blueprint';
import { saveAs } from 'file-saver';
import { cloneDeep, merge } from 'lodash';

/**
 * Hook to manage the blueprint state
 * @returns `void`
 */
export default function useBlueprint() {
  const hook = {
    selection: [] as RootBlueprint.PartAddresses,
    lastSelection: [] as RootBlueprint.PartAddress,

    hasUnsavedChanges: false,
    currentFileName: 'blueprint.stbp',

    createParts: () => blueprintStore.setState((state) => {}),

    deleteParts: (addresses: RootBlueprint.PartAddresses) => {
      hook.hasUnsavedChanges = true;

      blueprintStore.setState((state) => {
        // TODO: sort addresses first to avoid deleting shifted parts
        // ...or we could utilize the tree selection system
        const newParts = [...state.parts];

        addresses.forEach((address) => {
          let currentParts = newParts;

          address.forEach((direction, index) => {
            if (index + 1 === address.length) {
              currentParts.splice(direction, 1);
            } else {
              currentParts[direction] = { ...currentParts[direction] };
              currentParts = (currentParts[direction] as GroupPart.Type).parts;
            }
          });
        });

        return { parts: newParts };
      });
    },

    mutateParts: (
      data: RootPart.AnyPartialPartType,
      addresses: RootBlueprint.PartAddresses,
    ) => {
      hook.hasUnsavedChanges = true;

      blueprintStore.setState((state) => {
        const newParts = [...state.parts];

        addresses.forEach((address) => {
          let currentParts = newParts;

          address.forEach((direction, index) => {
            if (index + 1 === address.length) {
              currentParts[direction] = {
                ...merge(currentParts[direction], data),
              };
            } else {
              currentParts[direction] = { ...currentParts[direction] };
              currentParts = (currentParts[direction] as GroupPart.Type).parts;
            }
          });
        });

        return { parts: newParts };
      });
    },

    selectParts: (
      type: RootBlueprint.SelectionType,
      address: RootBlueprint.PartAddress,
    ) => {
      if (type === 'multi') {
      }
    },

    new: (blueprint = {}) => {
      const action = () => {
        hook.hasUnsavedChanges = false;
        blueprintStore.setState(
          merge(importifyBlueprint(cloneDeep(blueprint)), RootBlueprint.data),
        );
      };

      if (hook.hasUnsavedChanges) {
        if (window.confirm('Abandon unsaved changes?')) action();
      } else action();
    },

    save: () => {
      // TODO: give it a name
      // TODO: use exportify functions
      const blob = new Blob([JSON.stringify(blueprintStore.getState())], {
        type: 'text/plain;charset=utf-8',
      });
      // TODO: fix current name not renaming file
      saveAs(blob, hook.currentFileName);

      hook.hasUnsavedChanges = false;
    },
  };

  return hook;
}
