import { mutateBlueprint } from 'core/blueprint';
import { Group } from 'game/parts/Group';
import { getPart } from './getPart';

export const selectParts = (ids: string[]) => {
  let newSelections: string[] = [];

  mutateBlueprint((draft) => {
    ids.forEach((id) => {
      const part = getPart(id, draft);

      if (part && !part.selected) {
        part.selected = true;
        if (part.n === 'Group') (part as Group).expanded = true;
        newSelections.push(id);
      }
    });

    draft.selections.push(...newSelections);
  });
};
