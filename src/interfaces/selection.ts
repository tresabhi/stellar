import {
  getPartByAddress,
  mutateBlueprint,
  setPartsByAddresses,
} from 'interfaces/blueprint';
import { forEachRight, isEqual } from 'lodash';
import { UUID } from 'types/Parts';

export const selectPart = (ID: UUID) => selectParts([ID]);

export const selectParts = (IDs: UUID[]) => {
  let newSelections: UUID[] = [];

  mutateBlueprint((draft) => {
    IDs.forEach((address) => {
      const part = getPartByAddress(address, draft);

      if (part && !part.meta.selected) {
        part.meta.selected = true;
        newSelections.push(address);
      }
    });

    draft.selections.current = [...draft.selections.current, ...newSelections];
    draft.selections.last = IDs[IDs.length - 1];
  });
};

export const selectPartOnly = (ID: UUID) => selectPartsOnly([ID]);

export const selectPartsOnly = (IDs: UUID[]) => {
  mutateBlueprint((draft) => {
    setPartsByAddresses(
      draft.selections.current,
      { meta: { selected: false } },
      draft,
    );
    setPartsByAddresses(IDs, { meta: { selected: true } }, draft);

    draft.selections.current = IDs;
    draft.selections.last = IDs[IDs.length - 1];
  });
};

export const selectPartsFrom = (startID: UUID, endID: UUID) => {};

export const selectPartsFromOnly = (startID: UUID, endID: UUID) => {
  // it's backwards, so why not select backwards
  const direction = getPartDirection(startID, endID);
  if (direction === -1) [startID, endID] = [endID, startID];

  /**
   *
   */
};

export const unselectPart = (ID: UUID) => unselectParts([ID]);

export const unselectParts = (IDs: UUID[]) => {
  mutateBlueprint((draft) => {
    IDs.forEach((address) => {
      const part = getPartByAddress(address, draft);
      if (part) part.meta.selected = false;
    });

    IDs.forEach((address) => {
      forEachRight(draft.selections.current, (selection, index) => {
        if (isEqual(address, selection))
          draft.selections.current.splice(index, 1);
      });
    });
  });
};

export const unselectAllParts = () => {
  mutateBlueprint((draft) => {
    setPartsByAddresses(
      draft.selections.current,
      { meta: { selected: false } },
      draft,
    );
    draft.selections.current = [];
  });
};

export const togglePartSelection = (ID: UUID) => togglePartsSelection([ID]);

export const togglePartsSelection = (IDs: UUID[]) => {
  let spliceAddresses: UUID[] = [];
  let insertAddresses: UUID[] = [];

  mutateBlueprint((draft) => {
    IDs.forEach((address) => {
      const part = getPartByAddress(address, draft);

      if (part) {
        if (part.meta.selected) {
          spliceAddresses.push(address);
        } else {
          insertAddresses.push(address);
        }

        part.meta.selected = !part.meta.selected;
      }
    });

    spliceAddresses.forEach((address) => {
      forEachRight(draft.selections.current, (selection, index) => {
        if (isEqual(address, selection))
          draft.selections.current.splice(index, 1);
      });
    });

    draft.selections.current.push(...insertAddresses);
  });
};

export const getPartDirection = (startID: UUID, endID: UUID): -1 | 1 => {
  // return startID.some((startRoute, index) => endID[index] > startRoute)
  //   ? 1
  //   : -1;

  // TODO: make this functional

  return 1;
};
