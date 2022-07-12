import { mutateBlueprint } from 'core/blueprint';
import { Group } from 'game/parts/Group';

export const selectParts = (ids: string[]) => {
  let newSelections: string[] = [];

  mutateBlueprint((draft) => {
    ids.forEach((id) => {
      const part = draft.parts.get(id);

      if (part && !part.selected) {
        part.selected = true;
        if (part.n === 'Group') (part as Group).expanded = true;
        newSelections.push(id);
      }
    });

    draft.selections.push(...newSelections);
  });
};
