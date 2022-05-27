import { Group } from 'game/parts/Group';
import { ParentId } from 'types/Parts';
import { mutateBlueprint } from '../../blueprint/functions/mutateBlueprint';
import { createNewPart } from './createNewPart';
import { getPart } from './getPart';

export const insertPart = (
  partName: string,
  parentId?: ParentId,
  index = 0,
) => {
  mutateBlueprint((draft) => {
    const newPart = createNewPart(partName);

    if (newPart) {
      if (parentId) {
        const parentPart = getPart<Group>(parentId, draft);

        if (parentPart) {
          parentPart.partOrder.splice(index, 0, newPart.id);
          draft.parts.set(newPart.id, newPart);
        }
      } else {
        draft.partOrder.splice(index, 0, newPart.id);
        draft.parts.set(newPart.id, newPart);
      }
    }
  });
};
