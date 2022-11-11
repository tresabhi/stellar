import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';

export const selectParts = (
  ids: string[],
  draft?: Blueprint,
  expandGroups?: boolean,
) => {
  if (draft) {
    const newSelections: string[] = [];

    ids.forEach((id) => {
      const part = draft.parts[id];

      if (!part.selected) {
        part.selected = true;
        if (expandGroups && part.n === 'Group') {
          (part as Group).expanded = true;
        }
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
