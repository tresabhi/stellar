import { importifyBlueprint } from 'core/API/blueprint';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import * as GroupPart from 'core/API/part/types/group';
import * as RootPart from 'core/API/part/types/root';
import store from 'core/stores/blueprint';
import { saveAs } from 'file-saver';
import { cloneDeep, merge } from 'lodash';

export default function useBlueprint() {
  const hook = {
    selection: [] as RootBlueprint.partAddresses,
    lastSelection: [] as RootBlueprint.partAddress,

    hasUnsavedChanges: false,

    createParts: () => store.setState((state) => {}),

    deleteParts: (addresses: RootBlueprint.partAddresses) => {
      hook.hasUnsavedChanges = false;

      store.setState((state) => {
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
              currentParts = (currentParts[direction] as GroupPart.type).parts;
            }
          });
        });

        return { parts: newParts };
      });
    },

    mutateParts: (
      data: RootPart.anyPartialPartType,
      addresses: RootBlueprint.partAddresses,
    ) => {
      hook.hasUnsavedChanges = false;

      store.setState((state) => {
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
              currentParts = (currentParts[direction] as GroupPart.type).parts;
            }
          });
        });

        return { parts: newParts };
      });
    },

    selectParts: (
      type: RootBlueprint.selectionType,
      address: RootBlueprint.partAddress,
    ) => {
      if (type === 'multi') {
      }
    },

    newFreshBlueprint: (blueprint = {}) => {
      const action = () => {
        hook.hasUnsavedChanges = false;
        store.setState(
          merge(importifyBlueprint(cloneDeep(blueprint)), RootBlueprint.data),
        );
      };

      if (hook.hasUnsavedChanges) {
        if (window.confirm('Abandon unsaved changes?')) action();
      } else action();
    },

    // openFromFileSystem: () => {},
    save: () => {
      // TODO: give it a name
      // TODO: use exportify functions

      const blob = new Blob([JSON.stringify(store.getState())], {
        type: 'text/plain;charset=utf-8',
      });
      saveAs(blob, 'blueprint.json');

      hook.hasUnsavedChanges = false;
    },

    open: async () => {
      const [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      const text = await file.text();
      hook.newFreshBlueprint(JSON.parse(text));
    },
  };

  return hook;
}
