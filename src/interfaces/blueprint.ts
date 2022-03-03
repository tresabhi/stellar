import produce, { applyPatches, produceWithPatches } from 'immer';
import { cloneDeep, isUndefined, merge } from 'lodash';
import { PartWithMeta, PartWithTransformations } from 'parts/Default';
import blueprintStore from 'stores/blueprint';
import blueprintPatchHistoryStore, {
  BlueprintPatchHistoryStore,
} from 'stores/blueprintPatchHistory';
import DeepPartial from 'types/DeepPartial';
import { AnyPart, UUID } from 'types/Parts';
import { Blueprint, VanillaBlueprint } from '../types/Blueprint';
import { importifyParts } from './part';

// todo: make this data driven
// 0 is infinite undo/redo limit
let UNDO_LIMIT = 512;

export const VanillaBlueprintData: VanillaBlueprint = {
  center: 0,
  offset: { x: 0, y: 0 },
  parts: [],
  stages: [],
};

export const BlueprintData: Blueprint = {
  ...VanillaBlueprintData,

  meta: {
    format_version: 1,
  },
  selections: {
    current: [],
  },
  parts: new Map(),
  partOrder: [],
};

export const mergeWithDefaultBlueprintGlobals = (
  blueprint: object,
): Blueprint => {
  return { ...BlueprintData, ...blueprint };
};

export const blueprintToLatestVersion = (blueprint: Blueprint): Blueprint =>
  blueprint;

export const importifyBlueprint = (blueprint: object): Blueprint => {
  const mergedBlueprint = mergeWithDefaultBlueprintGlobals(blueprint);
  const partDataUpdatedBlueprint = {
    ...mergedBlueprint,
    parts: importifyParts(mergedBlueprint.parts),
  };
  const latestVersionBlueprint = blueprintToLatestVersion(
    partDataUpdatedBlueprint,
  );

  return latestVersionBlueprint;
};

export const savifyBlueprint = (blueprint: Blueprint) => cloneDeep(blueprint);

export const newBlueprint = (blueprint = {}) => {
  blueprintStore.setState(
    merge(importifyBlueprint(cloneDeep(blueprint)), BlueprintData),
  );
};

export const deletePartsBySelection = () => {
  mutateBlueprint((draft) => {
    draft.selections.current.forEach((selection) => {
      draft.parts.delete(selection);
      draft.partOrder.splice(draft.partOrder.indexOf(selection), 1);
      draft.selections.current = [];
      draft.selections.last = undefined;
    });
  });
};

export const getPartByAddress = (ID: UUID, state?: Blueprint) => {
  const blueprintState = state ?? blueprintStore.getState();
  return blueprintState.parts.get(ID);
};

export const setPartByAddress = (
  ID: UUID,
  newState: DeepPartial<AnyPart>,
  state?: Blueprint,
) => setPartsByAddresses([ID], newState, state);

export const setPartsByAddresses = (
  IDs: UUID[],
  newState: DeepPartial<AnyPart>,
  state?: Blueprint,
) => {
  if (state) {
    IDs.forEach((address) => {
      let part = getPartByAddress(address, state);
      merge(part, newState);
    });
  } else {
    mutateBlueprint((draft) => {
      setPartsByAddresses(IDs, newState, draft);
    });
  }
};

export const getReactivePartByID = <T extends AnyPart, S>(
  ID: UUID,
  slicer?: (state: T) => S,
) => {
  return blueprintStore((state) =>
    slicer
      ? slicer(getPartByAddress(ID, state) as T)
      : getPartByAddress(ID, state),
  );
};

export const translatePartsBySelection = (x: number, y: number) => {
  mutateBlueprint((draft) => {
    draft.selections.current.forEach((selection) => {
      let part = getPartByAddress(selection, draft) as PartWithTransformations &
        PartWithMeta;

      part.p.x += x;
      part.p.y += y;
    });
  });
};

interface SubscribeToPartOptions {
  fireInitially: boolean;
  unsubscribeOnUnmount: boolean;
}
const subscribeToPartDefaultOptions = {
  fireInitially: false,
  unsubscribeOnUnmount: false,
};
export const subscribeToPart = <T, S>(
  ID: UUID,
  handler: (slice: S) => void,
  slicer?: (state: T) => S,
  options?: Partial<SubscribeToPartOptions>,
) => {
  const mergedOptions = { ...subscribeToPartDefaultOptions, ...options };

  const compoundHandler = (slice?: S) => {
    if (isUndefined(slice)) {
      if (mergedOptions.unsubscribeOnUnmount) unsubscribe();
    } else {
      handler(slice);
    }
  };

  const unsubscribe = blueprintStore.subscribe((state) => {
    const part = getPartByAddress(ID, state);

    if (part) {
      if (slicer) {
        return slicer(part as unknown as T);
      } else {
        return part as unknown as S;
      }
    }
  }, compoundHandler);

  if (mergedOptions.fireInitially) {
    if (slicer) {
      compoundHandler(
        slicer(getPartByAddress(ID, blueprintStore.getState()) as unknown as T),
      );
    } else {
      compoundHandler(
        getPartByAddress(ID, blueprintStore.getState()) as unknown as S,
      );
    }
  }
};

export const mutateBlueprint = (producer: (state: Blueprint) => void) => {
  const [nextState, patches, inversePatches] = produceWithPatches(
    blueprintStore.getState(),
    producer,
  );

  blueprintPatchHistoryStore.setState(
    produce((draft: BlueprintPatchHistoryStore) => {
      draft.patches.splice(
        draft.index + 1,
        draft.patches.length - draft.index - 1,
      );

      draft.patches.push({
        undo: inversePatches,
        redo: patches,
      });

      if (UNDO_LIMIT === 0) {
        draft.index++;
      } else {
        if (draft.patches.length > UNDO_LIMIT) {
          draft.patches.shift();
        } else {
          draft.index++;
        }
      }
    }),
  );
  blueprintStore.setState(nextState);
};

export const undo = () => {
  blueprintPatchHistoryStore.setState(
    produce((draft: BlueprintPatchHistoryStore) => {
      const undoPatch = draft.patches[draft.index]?.undo;

      if (undoPatch) {
        blueprintStore.setState(
          applyPatches(blueprintStore.getState(), undoPatch),
        );
      }

      draft.index = Math.max(-1, draft.index - 1);
    }),
  );
};

export const redo = () => {
  blueprintPatchHistoryStore.setState(
    produce((draft: BlueprintPatchHistoryStore) => {
      const redoPatch = draft.patches[draft.index]?.redo;

      if (redoPatch) {
        blueprintStore.setState(
          applyPatches(blueprintStore.getState(), redoPatch),
        );
      }

      draft.index = Math.min(draft.patches.length - 1, draft.index + 1);
    }),
  );
};
