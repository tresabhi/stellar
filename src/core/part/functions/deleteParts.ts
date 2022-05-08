import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { UUID } from 'types/Parts';

export const deleteParts = (IDs: UUID[], state?: Blueprint) => {
  if (state) {
    state.selections.forEach((selection) => {
      state.parts.delete(selection);
      state.partOrder.splice(state.partOrder.indexOf(selection), 1);
    });
  } else {
    mutateBlueprint((draft) => {
      deleteParts(IDs, draft);
    });
  }
};
