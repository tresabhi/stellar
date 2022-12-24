import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import clonePart from './clonePart';
import getParent from './getParent';
import select from './select';
import unselectAll from './unselectAll';

export default function duplicateParts(ids: string[], blueprint?: Blueprint) {
  if (blueprint) {
    unselectAll(blueprint);

    ids.forEach((id) => {
      const parent = getParent(id, blueprint) ?? blueprint;
      const partIndex = parent.part_order.indexOf(id);

      if (partIndex !== -1) {
        const clonedPartData = clonePart(id, blueprint);

        if (clonedPartData) {
          const [clonedPartId, clonedParts] = clonedPartData;

          parent.part_order.splice(partIndex + 1, 0, clonedPartId);

          Object.keys(clonedParts).forEach((clonedPartChildId) => {
            const clonedPart = clonedParts[clonedPartChildId];
            blueprint.parts[clonedPartChildId] = clonedPart;
          });

          select(clonedPartId, blueprint);
        }
      }
    });
  } else {
    mutateBlueprint((draft) => {
      duplicateParts(ids, draft);
    });
  }
}
