import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';

export default function selectParts(
  ids: string[],
  blueprint?: Blueprint,
  expandGroups?: boolean,
) {
  if (blueprint) {
    const newSelections: string[] = [];

    ids.forEach((id) => {
      const part = blueprint.parts[id];

      if (!part.selected) {
        part.selected = true;
        if (expandGroups && part.n === 'Group') {
          (part as Group).expanded = true;
        }
        newSelections.push(id);
      }
    });

    blueprint.selections.push(...newSelections);
  } else {
    mutateBlueprint((draft) => {
      selectParts(ids, draft);
    });
  }
}
