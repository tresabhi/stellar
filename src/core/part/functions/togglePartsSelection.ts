import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { forEachRight, isEqual } from 'lodash';
import { UUID } from 'types/Parts';
import { getPart } from './getPart';

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
    mutateBlueprint((draft) => {
      togglePartsSelection(IDs, draft);
    });
  }
};
