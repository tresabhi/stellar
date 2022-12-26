import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { forEachRight, isEqual } from 'lodash';
import { MethodIds } from 'types/Parts';

export default function toggleSelection(ids: MethodIds, blueprint?: Blueprint) {
  const spliceIds: string[] = [];
  const insertIds: string[] = [];

  if (blueprint) {
    if (typeof ids === 'string') {
      const part = blueprint.parts[ids];

      if (part.selected) {
        const index = blueprint.selections.indexOf(ids);
        blueprint.selections.splice(index, 1);
      } else {
        blueprint.selections.push(ids);
      }

      part.selected = !part.selected;
    } else {
      ids.forEach((id) => {
        const part = blueprint.parts[id];

        if (part.selected) {
          spliceIds.push(id);
        } else {
          insertIds.push(id);
        }

        part.selected = !part.selected;
      });

      spliceIds.forEach((id) => {
        forEachRight(blueprint.selections, (selection, index) => {
          if (isEqual(id, selection)) blueprint.selections.splice(index, 1);
        });
      });

      blueprint.selections.push(...insertIds);
    }
  } else {
    mutateBlueprint((draft) => {
      toggleSelection(ids, draft);
    });
  }
}
