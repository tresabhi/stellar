import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import getParent from './getParent';

export default function deleteParts(ids: string[], blueprint?: Blueprint) {
  if (blueprint) {
    ids.forEach((id) => {
      const parent = getParent(id, blueprint) ?? blueprint;
      const selectionIndex = blueprint.selections.indexOf(id);

      delete blueprint.parts[id];

      if (selectionIndex !== -1) blueprint.selections.splice(selectionIndex, 1);
      if (parent) parent.part_order.splice(parent.part_order.indexOf(id), 1);
    });
  } else {
    mutateBlueprint((draft) => {
      deleteParts(ids, draft);
    });
  }
}
