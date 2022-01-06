import { importifyBlueprint, savifyBlueprint } from 'core/API/blueprint';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import blueprintStore from 'core/stores/blueprint';
import { saveAs } from 'file-saver';
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

    save: () => {
      const blob = new Blob(
        [JSON.stringify(savifyBlueprint(blueprintStore.getState()))],
        {
          type: 'text/plain;charset=utf-8',
        },
      );
      saveAs(blob, 'blueprint.txt');
    },
  };

  return hook;
}
