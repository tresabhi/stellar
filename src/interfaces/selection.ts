import { Blueprint } from 'game/Blueprint';
import {
  getPart,
  mutateBlueprint,
  mutateBlueprintWithoutHistory,
  mutateParts,
} from 'interfaces/blueprint';
import { forEachRight, isEqual } from 'lodash';
import { UUID } from 'types/Parts';

export const selectPart = (ID: UUID) => selectParts([ID]);

export const selectParts = (IDs: UUID[]) => {
  let newSelections: UUID[] = [];

  mutateBlueprintWithoutHistory((draft) => {
    IDs.forEach((ID) => {
      const part = getPart(ID, draft);

      if (part && !part.selected) {
        part.selected = true;
        newSelections.push(ID);
      }
    });

    draft.selections = [...draft.selections, ...newSelections];
  });
};

export const selectPartOnly = (ID: UUID, state?: Blueprint) =>
  selectPartsOnly([ID], state);

export const selectPartsOnly = (IDs: UUID[], draft?: Blueprint) => {
  if (draft) {
    mutateParts(
      draft.selections,
      (state) => {
        state.selected = false;
      },
      draft,
    );
    mutateParts(
      IDs,
      (draft) => {
        draft.selected = true;
      },
      draft,
    );

    draft.selections = IDs;
  } else {
    mutateBlueprintWithoutHistory((draft) => {
      selectPartsOnly(IDs, draft);
    });
  }
};

export const selectPartsFrom = (startID: UUID, endID: UUID) => {};

export const selectPartsFromOnly = (startID: UUID, endID: UUID) => {
  // TODO: make this functional
};

export const unselectPart = (ID: UUID) => unselectParts([ID]);

export const unselectParts = (IDs: UUID[]) => {
  mutateBlueprintWithoutHistory((draft) => {
    IDs.forEach((ID) => {
      const part = getPart(ID, draft);
      if (part) part.selected = false;
    });

    draft.selections = draft.selections.filter(
      (selection) => !IDs.includes(selection),
    );
  });
};

export const unselectAllParts = () => {
  mutateBlueprint((draft) => {
    mutateParts(
      draft.selections,
      (draft) => {
        draft.selected = false;
      },
      draft,
    );
    draft.selections = [];
  });
};

export const togglePartSelection = (ID: UUID, state?: Blueprint) =>
  togglePartsSelection([ID], state);

export const togglePartsSelection = (IDs: UUID[], state?: Blueprint) => {
  let spliceIDs: UUID[] = [];
  let insertIDs: UUID[] = [];

  if (state) {
    IDs.forEach((ID) => {
      const part = getPart(ID, state);

      if (part) {
        if (part.selected) {
          spliceIDs.push(ID);
        } else {
          insertIDs.push(ID);
        }

        part.selected = !part.selected;
      }
    });

    spliceIDs.forEach((ID) => {
      forEachRight(state.selections, (selection, index) => {
        if (isEqual(ID, selection)) state.selections.splice(index, 1);
      });
    });

    state.selections.push(...insertIDs);
  } else {
    mutateBlueprintWithoutHistory((draft) => {
      togglePartsSelection(IDs, draft);
    });
  }
};

export const getPartDirection = (startID: UUID, endID: UUID): -1 | 1 => {
  // TODO: make this functional

  return 1;
};
