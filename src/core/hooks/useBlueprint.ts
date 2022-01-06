import { importifyBlueprint } from 'core/API/blueprint';
import * as RootBlueprint from 'core/API/blueprint/types/root';
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
  };

  return hook;
}
