import {
  Blueprint,
  BlueprintData,
  SavedBlueprint,
  VanillaBlueprint,
} from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { Part } from 'game/parts/Part';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { PartWithTranslations } from 'game/parts/PartWithTranslations';
import produce, { applyPatches, produceWithPatches } from 'immer';
import { cloneDeep, isArray, isMap, merge } from 'lodash';
import blueprintStore from 'stores/blueprint';
import blueprintPatchHistoryStore, {
  BlueprintPatchHistoryStore,
} from 'stores/blueprintPatchHistory';
import DeepPartial from 'types/DeepPartial';
import { AnyPart, AnyPartMap, UUID } from 'types/Parts';
import { v4 as UUIDV4 } from 'uuid';
import { getPartData, importifyPart } from './part';
import { selectPartOnly } from './selection';

// TODO: make this data driven
// 0 is infinite undo/redo limit
let UNDO_LIMIT = 512;

export const newBlueprint = (importData?: VanillaBlueprint | SavedBlueprint) =>
  blueprintStore.setState(importifyBlueprint(importData ?? BlueprintData));

export const deletePartsBySelection = () => {
  mutateBlueprint((draft) => {
    draft.selections.forEach((selection) => {
      draft.parts.delete(selection);
      draft.partOrder.splice(draft.partOrder.indexOf(selection), 1);
    });

    draft.selections = [];
  });
};

export const getPart = <Type extends Part>(ID: UUID, state?: Blueprint) => {
  const blueprintState = state ?? blueprintStore.getState();
  return blueprintState.parts.get(ID) as Type | undefined;
};

export const getParts = (IDs: UUID[], state?: Blueprint) => {
  return IDs.map((ID) => getPart(ID, state));
};

export const getParentID = (ID: UUID, state?: Blueprint) => {
  const blueprintState = state ?? blueprintStore.getState();
  const part = getPart(ID, blueprintState);

  if (part) return part.parentID;
};

export const getParent = (ID: UUID, state?: Blueprint): Group | undefined => {
  const parentID = getParentID(ID);
  if (parentID) return getPart<Group>(parentID, state);
};

export const mutatePart = <Type extends Part>(
  ID: UUID,
  mutator: (draft: Type) => void,
  state?: Blueprint,
) => {
  mutateParts([ID], mutator, state);
};

export const mutateParts = <Type extends Part>(
  IDs: UUID[],
  mutator: (draft: Type) => void,
  state?: Blueprint,
) => {
  if (state) {
    IDs.forEach((ID) => {
      let part = getPart(ID, state) as Type | undefined;
      if (part) mutator(part);
    });
  } else {
    mutateBlueprint((draft) => {
      mutateParts(IDs, mutator, draft);
    });
  }
};

export const getPartReactive = (ID: UUID) => {
  return blueprintStore((state) => getPart(ID, state));
};

export const translateParts = (IDs: UUID[], x: number, y: number) =>
  mutateParts<PartWithTransformations>(IDs, (draft) => {
    draft.p.x += x;
    draft.p.y += y;
  });

export const translatePartsBySelection = (x: number, y: number) =>
  translateParts(blueprintStore.getState().selections, x, y);

export const safeTranslateParts = (
  x: number,
  y: number,
  selections: UUID[],
) => {
  mutateBlueprint((draft) => {
    const internalTranslator = (selections: UUID[]) => {
      selections.forEach((selection) => {
        const part = getPart(selection, draft);

        if (part) {
          if (part.n === 'Group') {
            internalTranslator((part as Group).partOrder);
          } else if ((part as AnyPart).p) {
            (part as PartWithTranslations).p.x += x;
            (part as PartWithTranslations).p.y += y;
          }
        }
      });
    };

    internalTranslator(selections);
  });
};

export const safeTranslatePartsBySelection = (x: number, y: number) =>
  safeTranslateParts(x, y, blueprintStore.getState().selections);

interface SubscribeToPartOptions {
  fireInitially: boolean;
}
const subscribeToPartDefaultOptions = {
  fireInitially: false,
};
export const subscribeToPart = <Type extends Part, Slice extends any>(
  ID: UUID,
  handler: (slice: Slice) => void,
  slicer?: (part: Type) => Slice,
  options?: Partial<SubscribeToPartOptions>,
) => {
  const mergedOptions = {
    ...subscribeToPartDefaultOptions,
    ...(options ?? {}),
  };
  let avoidThisEvent = false;

  const unsubscribe = blueprintStore.subscribe(
    (state) => {
      const part = getPart(ID, state);

      if (part) {
        if (slicer) {
          return slicer(part as Type);
        } else {
          return part as Slice;
        }
      } else {
        avoidThisEvent = true;
        unsubscribe();
      }
    },
    (slice) => {
      if (!avoidThisEvent) handler(slice!);
    },
  );

  if (mergedOptions.fireInitially) {
    const part = getPart(ID);

    if (part) {
      if (slicer) {
        handler(slicer(part as Type));
      } else {
        handler(part as Slice);
      }
    }
  }

  return unsubscribe;
};

export const mutateBlueprint = (
  producer: (state: Blueprint) => void,
  lastStateLie?: DeepPartial<Blueprint>,
) => {
  const [nextState, patches, inversePatches] = produceWithPatches(
    lastStateLie
      ? merge(blueprintStore.getState(), lastStateLie)
      : blueprintStore.getState(),
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

export const mutateBlueprintWithoutHistory = (
  producer: (state: Blueprint) => void,
) => {
  const nextState = produce(blueprintStore.getState(), producer);
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

      draft.index = Math.max(0, draft.index - 1);
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

export const createNewPart = <Type extends Part>(
  partName: string,
  ID?: UUID,
  parentID?: UUID,
) => {
  const partData = getPartData(partName);

  if (partData) {
    const newPart = cloneDeep(partData);

    (newPart.ID as string) = ID ?? UUIDV4();
    newPart.parentID = parentID;

    return newPart as Type;
  }
};

export const insertPart = (partName: string, parentID?: UUID, index = 0) => {
  mutateBlueprint((draft) => {
    const newPart = createNewPart(partName);

    if (newPart) {
      if (parentID) {
        const parentPart = getPart(parentID, draft) as Group;

        if (parentPart) {
          parentPart.partOrder.splice(index, 0, newPart.ID);
          draft.parts.set(newPart.ID, newPart);
        }
      } else {
        draft.partOrder.splice(index, 0, newPart.ID);
        draft.parts.set(newPart.ID, newPart);
      }
    }
  });
};

export const getPartIndex = (
  partID: UUID,
  parentID?: UUID,
  state?: Blueprint,
) => {
  const parent = parentID
    ? getPart(parentID)
    : state ?? blueprintStore.getState();

  if (parentID ? parent && (parent as AnyPart).n === 'Group' : true) {
    return (parent as Group | Blueprint).partOrder.indexOf(partID);
  }
};

export const groupParts = (IDs: UUID[], replaceID: UUID) => {
  mutateBlueprint((draft) => {
    const newGroup = createNewPart<Group>('Group');
    const newGroupParent = getParent(replaceID, draft) ?? draft;

    if (newGroup) {
      draft.parts.set(newGroup.ID, newGroup);
      newGroupParent.partOrder[newGroupParent.partOrder.indexOf(replaceID)] =
        newGroup.ID;
      newGroup.partOrder = IDs;

      IDs.forEach((ID) => {
        const currentParent = getParent(ID, draft) ?? draft;
        const currentPart = getPart(ID, draft);
        const spliceIndex = currentParent.partOrder.indexOf(ID);

        if (currentPart) currentPart.parentID = newGroup.ID;
        if (spliceIndex !== -1) currentParent.partOrder.splice(spliceIndex, 1);
      });

      selectPartOnly(newGroup.ID, draft);
    }
  });
};

export const groupPartsBySelection = () => {
  const blueprintState = blueprintStore.getState();

  groupParts(
    blueprintState.selections,
    blueprintState.selections[blueprintState.selections.length - 1],
  );
};

export const importifyBlueprint = (
  blueprint: VanillaBlueprint | SavedBlueprint | Blueprint,
) => {
  const clonedBlueprint = cloneDeep(blueprint);
  const targetBlueprint = cloneDeep(BlueprintData);

  // STEP 1: Copy all generic properties
  targetBlueprint.center = clonedBlueprint.center;
  targetBlueprint.offset.x = clonedBlueprint.offset.x;
  targetBlueprint.offset.y = clonedBlueprint.offset.y;

  // STEP 2: Convert all parts to the new format
  const newPartsMap: AnyPartMap = new Map();

  if (isMap(clonedBlueprint.parts)) {
    // normal blueprint, probably never gonna use this
    (clonedBlueprint as Blueprint).parts.forEach((part, ID) => {
      const importifiedPart = importifyPart(cloneDeep(part), ID);
      if (importifiedPart) newPartsMap.set(ID, importifiedPart);
    });

    targetBlueprint.partOrder = (clonedBlueprint as Blueprint).partOrder;
    targetBlueprint.parts = newPartsMap;
  } else if (clonedBlueprint.parts.length === 0) {
    // not parts to convert
  } else if (isArray(clonedBlueprint.parts[0])) {
    // saved version of the blueprint
    (clonedBlueprint as SavedBlueprint).parts.forEach(([ID, part]) => {
      const importifiedPart = importifyPart(cloneDeep(part), ID);
      if (importifiedPart) newPartsMap.set(ID, importifiedPart);
    });

    targetBlueprint.partOrder = (clonedBlueprint as SavedBlueprint).partOrder;
    targetBlueprint.parts = newPartsMap;
  } else {
    // vanilla blueprint, straight from the game
    let newPartOrder: UUID[] = [];

    (clonedBlueprint as Blueprint).partOrder = [];
    (clonedBlueprint as VanillaBlueprint).parts.forEach((part) => {
      const ID = UUIDV4();
      const importifiedPart = importifyPart(cloneDeep(part), ID);
      if (importifiedPart) {
        newPartsMap.set(ID, importifiedPart);
        newPartOrder.push(ID);
      }
    });

    targetBlueprint.partOrder = newPartOrder;
    targetBlueprint.parts = newPartsMap;
  }

  // STEP 3: Copy all stages
  targetBlueprint.stages = clonedBlueprint.stages;

  // STEP 4: Copy all selections
  if ((clonedBlueprint as Blueprint).selections) {
    targetBlueprint.selections = (clonedBlueprint as Blueprint).selections;
  }

  return targetBlueprint;
};
