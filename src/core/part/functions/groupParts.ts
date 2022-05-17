import { mutateBlueprint } from 'core/blueprint';
import { getParent, selectPartOnly } from 'core/part';
import { Group } from 'game/parts/Group';
import { UUID } from 'types/Parts';
import { createNewPart } from '../../part/functions/createNewPart';
import { getPart } from '../../part/functions/getPart';

export const groupParts = (IDs: UUID[], replaceID: UUID) => {
  mutateBlueprint((draft) => {
    const newGroup = createNewPart<Group>('Group');
    const newGroupParent = getParent(replaceID, draft) ?? draft;

    if (newGroup) {
      draft.parts.set(newGroup.ID, newGroup);
      newGroupParent.partOrder[newGroupParent.partOrder.indexOf(replaceID)] =
        newGroup.ID;
      newGroup.partOrder = IDs;

      IDs.forEach((ID) => {
        const currentParent = getParent(ID, draft) ?? draft;
        const currentPart = getPart(ID, draft);
        const spliceIndex = currentParent.partOrder.indexOf(ID);

        if (currentPart) currentPart.parentID = newGroup.ID;
        if (spliceIndex !== -1) currentParent.partOrder.splice(spliceIndex, 1);
      });

      selectPartOnly(newGroup.ID, draft);
    }
  });
};
