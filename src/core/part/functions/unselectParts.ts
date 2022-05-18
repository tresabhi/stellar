import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { UUID } from 'types/Parts';
import { getPart } from './getPart';

export const unselectParts = (IDs: UUID[], state?: Blueprint) => {
  if (state) {
    IDs.forEach((ID) => {
      const part = getPart(ID, state);
      if (part) part.selected = false;
    });

    state.selections = state.selections.filter(
      (selection) => !IDs.includes(selection),
    );
  } else {
    mutateBlueprint((draft) => {
      unselectParts(IDs, draft);
    });
  }
};
