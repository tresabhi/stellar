import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { getPart } from './getPart';

export const unselectParts = (ids: string[], state?: Blueprint) => {
  if (state) {
    ids.forEach((id) => {
      const part = getPart(id, state);
      if (part) part.selected = false;
    });

    state.selections = state.selections.filter(
      (selection) => !ids.includes(selection),
    );
  } else {
    mutateBlueprint((draft) => {
      unselectParts(ids, draft);
    });
  }
};
