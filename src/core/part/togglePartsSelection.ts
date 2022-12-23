import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { forEachRight, isEqual } from 'lodash';

export default function togglePartsSelection(
  ids: string[],
  blueprint?: Blueprint,
) {
  const spliceIds: string[] = [];
  const insertIds: string[] = [];

  if (blueprint) {
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
  } else {
    mutateBlueprint((draft) => {
      togglePartsSelection(ids, draft);
    });
  }
}
