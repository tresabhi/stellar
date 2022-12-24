import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { MethodIds } from 'types/Parts';

export default function select(
  ids: MethodIds,
  blueprint?: Blueprint,
  expandGroups?: boolean,
) {
  if (blueprint) {
    if (typeof ids === 'string') {
      const part = blueprint.parts[ids];

      if (!part.selected) {
        part.selected = true;
        blueprint.selections.push(ids);
      }
    } else {
      ids.forEach((id) => {
        const part = blueprint.parts[id];

        if (!part.selected) {
          part.selected = true;
          if (expandGroups && part.n === 'Group') {
            (part as Group).expanded = true;
          }
          blueprint.selections.push(id);
        }
      });
    }
  } else {
    mutateBlueprint((draft) => {
      select(ids, draft);
    });
  }
}
