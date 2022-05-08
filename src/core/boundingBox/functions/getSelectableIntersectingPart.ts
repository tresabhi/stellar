import { getPart, getPartRegistry } from 'core/part';
import { Group } from 'game/parts/Group';
import blueprintStore from 'stores/blueprint';
import { Vector2 } from 'three';
import { UUID } from 'types/Parts';

export const getSelectableIntersectingPart = (point: Vector2) => {
  const blueprintState = blueprintStore.getState();
  const checked = new Map<UUID, true>();

  const check = (IDs: UUID[]) => {
    let result: UUID | undefined;

    IDs.some((ID) => {
      if (!checked.has(ID)) {
        checked.set(ID, true);

        const part = getPart(ID);

        if (part) {
          if (part.n === 'Group' && part.selected) {
            const groupResult = check((part as Group).partOrder);

            if (groupResult) {
              result = groupResult;

              return true;
            }
          } else {
            const computeBoundingBox = getPartRegistry(
              part.n,
            )?.computeBoundingBox;

            if (computeBoundingBox) {
              const boundingBox = computeBoundingBox(part);

              if (
                point.x >= boundingBox.min.x &&
                point.x <= boundingBox.max.x &&
                point.y >= boundingBox.min.y &&
                point.y <= boundingBox.max.y
              ) {
                result = ID;

                return true;
              }
            }
          }
        }
      }

      return false;
    });

    return result;
  };

  return check(blueprintState.selections) ?? check(blueprintState.partOrder);
};
