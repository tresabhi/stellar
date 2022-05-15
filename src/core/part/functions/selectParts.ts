import { mutateBlueprint } from 'core/blueprint';
import { Group } from 'game/parts/Group';
import { UUID } from 'types/Parts';
import { getPart } from './getPart';

export const selectParts = (IDs: UUID[]) => {
  let newSelections: UUID[] = [];

  mutateBlueprint((draft) => {
    IDs.forEach((ID) => {
      const part = getPart(ID, draft);

      if (part && !part.selected) {
        part.selected = true;
        if (part.n === 'Group') (part as Group).expanded = true;
        newSelections.push(ID);
      }
    });

    draft.selections.push(...newSelections);
  });
};
