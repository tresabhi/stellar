import { getPart, mutateBlueprint, mutateParts } from 'interfaces/blueprint';
import { forEachRight, isEqual } from 'lodash';
import { Blueprint } from 'types/Blueprint';
import { PartID, PartIDs } from 'types/Parts';

export const selectPart = (ID: PartID) => selectParts([ID]);

export const selectParts = (IDs: PartIDs) => {
  let newSelections: PartIDs = [];

  mutateBlueprint((draft) => {
    IDs.forEach((ID) => {
      const part = getPart(ID, draft);

      if (part && !part.meta.selected) {
        part.meta.selected = true;
        newSelections.push(ID);
      }
    });

    draft.selections.current = [...draft.selections.current, ...newSelections];
    draft.selections.last = IDs[IDs.length - 1];
  });
};

export const selectPartOnly = (ID: PartID, state?: Blueprint) =>
  selectPartsOnly([ID], state);

export const selectPartsOnly = (IDs: PartIDs, state?: Blueprint) => {
  if (state) {
    mutateParts(state.selections.current, { meta: { selected: false } }, state);
    mutateParts(IDs, { meta: { selected: true } }, state);

    state.selections.current = IDs;
    state.selections.last = IDs[IDs.length - 1];
  } else {
    mutateBlueprint((draft) => {
      // TODO: mutate without history
      selectPartsOnly(IDs, draft);
    });
  }
};

export const selectPartsFrom = (startID: PartID, endID: PartID) => {};

export const selectPartsFromOnly = (startID: PartID, endID: PartID) => {
  // TODO: make this functional
};

export const unselectPart = (ID: PartID) => unselectParts([ID]);

export const unselectParts = (IDs: PartIDs) => {
  mutateBlueprint((draft) => {
    IDs.forEach((ID) => {
      const part = getPart(ID, draft);
      if (part) part.meta.selected = false;
    });

    draft.selections.current = draft.selections.current.filter(
      (selection) => !IDs.includes(selection),
    );
  });
};

export const unselectAllParts = () => {
  mutateBlueprint((draft) => {
    mutateParts(draft.selections.current, { meta: { selected: false } }, draft);
    draft.selections.current = [];
  });
};

export const togglePartSelection = (ID: PartID) => togglePartsSelection([ID]);

export const togglePartsSelection = (IDs: PartIDs) => {
  let spliceIDs: PartIDs = [];
  let insertIDs: PartIDs = [];

  mutateBlueprint((draft) => {
    IDs.forEach((ID) => {
      const part = getPart(ID, draft);

      if (part) {
        if (part.meta.selected) {
          spliceIDs.push(ID);
        } else {
          insertIDs.push(ID);
        }

        part.meta.selected = !part.meta.selected;
      }
    });

    spliceIDs.forEach((ID) => {
      forEachRight(draft.selections.current, (selection, index) => {
        if (isEqual(ID, selection)) draft.selections.current.splice(index, 1);
      });
    });

    draft.selections.current.push(...insertIDs);
    draft.selections.last = IDs[IDs.length - 1];
  });
};

export const getPartDirection = (startID: PartID, endID: PartID): -1 | 1 => {
  // TODO: make this functional

  return 1;
};
