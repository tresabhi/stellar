import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import useBoundingBoxes, { UseBoundingBoxes } from 'hooks/useBoundingBoxes';
import produce from 'immer';
import { UUID } from 'types/Parts';

export const deleteParts = (IDs: UUID[], state?: Blueprint) => {
  if (state) {
    useBoundingBoxes.setState(
      produce((draft: UseBoundingBoxes) => {
        state.selections.forEach((selection) => {
          state.parts.delete(selection);
          state.partOrder.splice(state.partOrder.indexOf(selection), 1);
          delete draft[selection];
        });
      }),
      true,
    );
  } else {
    mutateBlueprint((draft) => {
      deleteParts(IDs, draft);
    });
  }
};
