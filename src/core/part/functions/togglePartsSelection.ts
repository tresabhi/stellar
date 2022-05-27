import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { forEachRight, isEqual } from 'lodash';
import { getPart } from './getPart';

export const togglePartsSelection = (ids: string[], state?: Blueprint) => {
  let spliceIds: string[] = [];
  let insertIds: string[] = [];

  if (state) {
    ids.forEach((id) => {
      const part = getPart(id, state);

      if (part) {
        if (part.selected) {
          spliceIds.push(id);
        } else {
          insertIds.push(id);
        }

        part.selected = !part.selected;
      }
    });

    spliceIds.forEach((id) => {
      forEachRight(state.selections, (selection, index) => {
        if (isEqual(id, selection)) state.selections.splice(index, 1);
      });
    });

    state.selections.push(...insertIds);
  } else {
    mutateBlueprint((draft) => {
      togglePartsSelection(ids, draft);
    });
  }
};
