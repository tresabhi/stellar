import {
  getPartByID,
  mutateBlueprint,
  mutatePartsByIDs
} from 'interfaces/blueprint';
import { forEachRight, isEqual } from 'lodash';
import { PartID, PartIDs } from 'types/Parts';

export const selectPart = (ID: PartID) => selectParts([ID]);

export const selectParts = (IDs: PartIDs) => {
  let newSelections: PartIDs = [];

  mutateBlueprint((draft) => {
    IDs.forEach((ID) => {
      const part = getPartByID(ID, draft);

      if (part && !part.meta.selected) {
        part.meta.selected = true;
        newSelections.push(ID);
      }
    });

    draft.selections.current = [...draft.selections.current, ...newSelections];
    draft.selections.last = IDs[IDs.length - 1];
  });
};

export const selectPartOnly = (ID: PartID) => selectPartsOnly([ID]);

export const selectPartsOnly = (IDs: PartIDs) => {
  mutateBlueprint((draft) => {
    mutatePartsByIDs(
      draft.selections.current,
      { meta: { selected: false } },
      draft,
    );
    mutatePartsByIDs(IDs, { meta: { selected: true } }, draft);

    draft.selections.current = IDs;
    draft.selections.last = IDs[IDs.length - 1];
  });
};

export const selectPartsFrom = (startID: PartID, endID: PartID) => {};

export const selectPartsFromOnly = (startID: PartID, endID: PartID) => {
  // it's backwards, so why not select backwards
  const direction = getPartDirection(startID, endID);
  if (direction === -1) [startID, endID] = [endID, startID];
};

export const unselectPart = (ID: PartID) => unselectParts([ID]);

export const unselectParts = (IDs: PartIDs) => {
  mutateBlueprint((draft) => {
    IDs.forEach((ID) => {
      const part = getPartByID(ID, draft);
      if (part) part.meta.selected = false;
    });

    IDs.forEach((ID) => {
      forEachRight(draft.selections.current, (selection, index) => {
        if (isEqual(ID, selection)) draft.selections.current.splice(index, 1);
      });
    });
  });
};

export const unselectAllParts = () => {
  mutateBlueprint((draft) => {
    mutatePartsByIDs(
      draft.selections.current,
      { meta: { selected: false } },
      draft,
    );
    draft.selections.current = [];
  });
};

export const togglePartSelection = (ID: PartID) => togglePartsSelection([ID]);

export const togglePartsSelection = (IDs: PartIDs) => {
  let spliceIDs: PartIDs = [];
  let insertIDs: PartIDs = [];

  mutateBlueprint((draft) => {
    IDs.forEach((ID) => {
      const part = getPartByID(ID, draft);

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
  });
};

export const getPartDirection = (startID: PartID, endID: PartID): -1 | 1 => {
  // TODO: make this functional

  return 1;
};
