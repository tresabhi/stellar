import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';
import getParent from './getParent';
import select from './select';
import unselectAll from './unselectAll';

export default function ungroup(ids: MethodIds, blueprint?: Blueprint) {
  if (blueprint) {
    normalizeIds(ids).forEach((id) => {
      unselectAll(blueprint);

      const part = blueprint.parts[id];

      if (part.n === 'Group') {
        const group = part as Group;
        const parent = getParent(id, blueprint) ?? blueprint;
        const insertIndex = parent.part_order.indexOf(group.id);
        const chunkBefore = parent.part_order.splice(0, insertIndex);
        const chunkAfter = parent.part_order.splice(
          1,
          parent.part_order.length - 1,
        );

        group.part_order.forEach((childId) => {
          const child = blueprint.parts[childId];
          if (child) child.parent_id = group.parent_id;
        });
        parent.part_order = [
          ...chunkBefore,
          ...group.part_order,
          ...chunkAfter,
        ];
        delete blueprint.parts[group.id];
        select(group.part_order, blueprint);
      }
    });
  } else {
    mutateBlueprint((draft) => ungroup(ids, draft));
  }
}
