import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';
import create from './create';
import getParent from './getParent';
import selectConcurrent from './selectConcurrent';

export default function group(
  ids: MethodIds,
  replaceId: string,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    const newGroup = create<Group>('Group');
    const newGroupParent = getParent(replaceId, blueprint) ?? blueprint;

    if (newGroup) {
      blueprint.parts[newGroup.id] = newGroup;
      newGroupParent.part_order[newGroupParent.part_order.indexOf(replaceId)] =
        newGroup.id;
      newGroup.part_order = normalizeIds(ids);

      newGroup.part_order.forEach((id) => {
        const currentParent = getParent(id, blueprint) ?? blueprint;
        const currentPart = blueprint.parts[id];
        const spliceIndex = currentParent.part_order.indexOf(id);

        if (currentPart) currentPart.parent = newGroup.id;
        if (spliceIndex !== -1) currentParent.part_order.splice(spliceIndex, 1);
      });

      selectConcurrent(newGroup.id, blueprint);
    }
  } else {
    mutateBlueprint((draft) => {
      group(ids, replaceId, draft);
    });
  }
}
