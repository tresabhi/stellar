import produce, { applyPatches, produceWithPatches } from 'immer';
import { cloneDeep, isUndefined, merge } from 'lodash';
import { PartWithMeta, PartWithTransformations } from 'parts/Default';
import { Group } from 'parts/Group';
import blueprintStore from 'stores/blueprint';
import blueprintPatchHistoryStore, {
  BlueprintPatchHistoryStore,
} from 'stores/blueprintPatchHistory';
import DeepPartial from 'types/DeepPartial';
import { AnyPart } from 'types/Parts';
import { Blueprint, PartAddress, VanillaBlueprint } from '../types/Blueprint';
import { importifyPartsData } from './part';

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
    parts: importifyPartsData(mergedBlueprint.parts, []),
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
      const partId = selection[selection.length - 1];
      const parentAddress = [...selection].splice(0, selection.length - 1);
      let parent: Group | Blueprint =
        (getPartByAddress(parentAddress, draft) as Group) ?? draft;

      parent.parts.delete(partId);
    });

    draft.selections.current = [];
  });
};

export const getPartByAddress = (address: PartAddress, state?: Blueprint) => {
  const blueprintState = state ?? blueprintStore.getState();
  let currentPart = blueprintState.parts.get(address[0]);

  address.forEach((route, index) => {
    if (index === 0) {
      return;
    } else {
      currentPart = (currentPart as Group | undefined)?.parts?.get(route);
    }
  });

  return currentPart;
};

export const setPartByAddress = (
  address: PartAddress,
  newState: DeepPartial<AnyPart>,
  state?: Blueprint,
) => setPartsByAddresses([address], newState, state);

export const setPartsByAddresses = (
  addresses: PartAddress[],
  newState: DeepPartial<AnyPart>,
  state?: Blueprint,
) => {
  if (state) {
    addresses.forEach((address) => {
      let part = getPartByAddress(address, state);
      merge(part, newState);
    });
  } else {
    mutateBlueprint((draft) => {
      setPartsByAddresses(addresses, newState, draft);
    });
  }
};

export const getReactivePartByAddress = <T, S>(
  address: PartAddress,
  slicer?: (state: T) => S,
) => {
  return blueprintStore((state) =>
    slicer
      ? slicer(getPartByAddress(address, state) as unknown as T)
      : getPartByAddress(address, state),
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

export const subscribeToPart = <T, S>(
  address: PartAddress,
  handler: (slice: S) => void,
  slicer?: (state: T) => S,
  fireInitially = false,
) => {
  const compoundHandler = (slice?: S) => {
    if (!isUndefined(slice)) handler(slice);
  };

  blueprintStore.subscribe((state) => {
    const part = getPartByAddress(address, state);

    if (part) {
      if (slicer) {
        return slicer(part as unknown as T);
      } else {
        return part as unknown as S;
      }
    }
  }, compoundHandler);

  if (fireInitially) {
    if (slicer) {
      compoundHandler(
        slicer(
          getPartByAddress(address, blueprintStore.getState()) as unknown as T,
        ),
      );
    } else {
      compoundHandler(
        getPartByAddress(address, blueprintStore.getState()) as unknown as S,
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

      draft.index++;
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
