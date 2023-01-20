import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import getParent from './getParent';
import getRelativeDirection, {
  RelativeDirection,
} from './getRelativeDirection';

export default function selectBetween(
  originId: string,
  targetId: string,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    const relativeDirection = getRelativeDirection(originId, targetId);
    const parent = getParent(originId) ?? blueprint;
    const originIndex = parent.part_order.indexOf(originId);

    if (originIndex !== -1) {
      for (
        let index = originIndex;
        relativeDirection === RelativeDirection.Up
          ? index > -1
          : index < parent.part_order.length;
        index += relativeDirection === RelativeDirection.Up ? -1 : 1
      ) {
        const childId = parent.part_order[index];

        if (!blueprint.parts[childId].selected) {
          blueprint.parts[childId].selected = true;
          blueprint.selections.push(childId);
        }

        if (childId === targetId) break;
      }
    }
  } else {
    mutateBlueprint((draft) => {
      selectBetween(originId, targetId, draft);
    });
  }
}
