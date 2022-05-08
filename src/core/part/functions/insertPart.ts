import { Group } from 'game/parts/Group';
import { ParentID } from 'types/Parts';
import { createNewPart } from './createNewPart';
import { getPart } from './getPart';
import { mutateBlueprint } from '../../blueprint/functions/mutateBlueprint';

export const insertPart = (
  partName: string,
  parentID?: ParentID,
  index = 0,
) => {
  mutateBlueprint((draft) => {
    const newPart = createNewPart(partName);

    if (newPart) {
      if (parentID) {
        const parentPart = getPart<Group>(parentID, draft);

        if (parentPart) {
          parentPart.partOrder.splice(index, 0, newPart.ID);
          draft.parts.set(newPart.ID, newPart);
        }
      } else {
        draft.partOrder.splice(index, 0, newPart.ID);
        draft.parts.set(newPart.ID, newPart);
      }
    }
  });
};
