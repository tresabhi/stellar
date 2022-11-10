import { mutateBlueprint } from 'core/blueprint';
import { Group } from 'game/parts/Group';
import { PartWithPosition } from 'game/parts/PartWithPosition';
import useApp from 'stores/app';
import { ParentId } from 'types/Parts';
import { createNewPart } from './createNewPart';
import { getPart } from './getPart';
import { selectPartOnly } from './selectPartOnly';

export interface InsertPartOptions {
  index: number;
  nearCamera: boolean;
  select: boolean;
}
export const insertPartDefaultOptions: InsertPartOptions = {
  index: 0,
  nearCamera: true,
  select: false,
};

export const insertNewPart = (
  partName: string,
  parentId?: ParentId,
  options: Partial<InsertPartOptions> = insertPartDefaultOptions,
) => {
  const mergedOptions: InsertPartOptions = {
    ...insertPartDefaultOptions,
    ...options,
  };

  mutateBlueprint((draft) => {
    const newPart = createNewPart(partName);
    const { camera } = useApp.getState().editor;

    if (newPart) {
      if (camera && (newPart as PartWithPosition).p) {
        (newPart as PartWithPosition).p.x = Math.round(camera.position.x);
        (newPart as PartWithPosition).p.y = Math.round(camera.position.y);
      }

      if (parentId) {
        const parentPart = getPart<Group>(parentId);

        if (parentPart) {
          parentPart.part_order.splice(mergedOptions.index, 0, newPart.id);
          draft.parts.set(newPart.id, newPart);
        }
      } else {
        draft.part_order.splice(mergedOptions.index, 0, newPart.id);
        draft.parts.set(newPart.id, newPart);
      }

      selectPartOnly(newPart.id, draft);
    }
  });
};
