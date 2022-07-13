import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';

export const selectParts = (ids: string[], draft?: Blueprint) => {
  if (draft) {
    let newSelections: string[] = [];

    ids.forEach((id) => {
      const part = draft.parts.get(id);

      if (part && !part.selected) {
        part.selected = true;
        if (part.n === 'Group') (part as Group).expanded = true;
        newSelections.push(id);
      }
    });

    draft.selections.push(...newSelections);
  } else {
    mutateBlueprint((draft) => {
      selectParts(ids, draft);
    });
  }
};
