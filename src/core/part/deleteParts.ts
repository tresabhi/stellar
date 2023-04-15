import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';
import getParent from './getParent';

export default function deleteParts(ids: MethodIds, blueprint?: Blueprint) {
  if (blueprint) {
    normalizeIds(ids).forEach((id) => {
      const parent = getParent(id, blueprint) ?? blueprint;
      const selectionIndex = blueprint.part_selections.indexOf(id);

      delete blueprint.parts[id];

      if (selectionIndex !== -1)
        blueprint.part_selections.splice(selectionIndex, 1);
      if (parent) parent.part_order.splice(parent.part_order.indexOf(id), 1);
    });
  } else {
    mutateBlueprint((draft) => {
      deleteParts(ids, draft);
    });
  }
}
