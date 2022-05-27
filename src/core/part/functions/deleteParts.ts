import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';

export const deleteParts = (ids: string[], state?: Blueprint) => {
  if (state) {
    state.selections.forEach((selection) => {
      state.parts.delete(selection);
      state.partOrder.splice(state.partOrder.indexOf(selection), 1);
      state.boundingBoxes.delete(selection);
    });
  } else {
    mutateBlueprint((draft) => {
      deleteParts(ids, draft);
    });
  }
};
