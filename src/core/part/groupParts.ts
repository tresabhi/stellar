import { mutateBlueprint } from 'core/blueprint';
import { createNewPart, getParent, selectPartOnly } from 'core/part';
import { Group } from 'game/parts/Group';

export const groupParts = (ids: string[], replaceId: string) => {
  mutateBlueprint((draft) => {
    const newGroup = createNewPart<Group>('Group');
    const newGroupParent = getParent(replaceId, draft) ?? draft;

    if (newGroup) {
      draft.parts.set(newGroup.id, newGroup);
      newGroupParent.partOrder[newGroupParent.partOrder.indexOf(replaceId)] =
        newGroup.id;
      newGroup.partOrder = ids;

      ids.forEach((id) => {
        const currentParent = getParent(id, draft) ?? draft;
        const currentPart = draft.parts.get(id);
        const spliceIndex = currentParent.partOrder.indexOf(id);

        if (currentPart) currentPart.parentId = newGroup.id;
        if (spliceIndex !== -1) currentParent.partOrder.splice(spliceIndex, 1);
      });

      selectPartOnly(newGroup.id, draft);
    }
  });
};
