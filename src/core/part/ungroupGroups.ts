import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import getParent from './getParent';
import selectParts from './selectParts';
import unselectAllParts from './unselectAllParts';

// TODO: rename to simply ungroup
export default function ungroupGroups(ids: string[], blueprint?: Blueprint) {
  if (blueprint) {
    unselectAllParts(blueprint);

    ids.forEach((id) => {
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
        selectParts(group.part_order, blueprint);
      }
    });
  } else {
    mutateBlueprint((draft) => ungroupGroups(ids, draft));
  }
}
