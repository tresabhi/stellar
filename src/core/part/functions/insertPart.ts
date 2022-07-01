import { Group } from 'game/parts/Group';
import { AnyPart, ParentId } from 'types/Parts';
import { mutateBlueprint } from '../../blueprint/functions/mutateBlueprint';
import { createNewPart } from './createNewPart';
import { getPart } from './getPart';

export interface InsertPartOptions {
  index: number;
  // TODO: implement this feature
  nearCamera: boolean;
}
export const insertPartDefaultOptions: InsertPartOptions = {
  index: 0,
  nearCamera: true,
};

export const insertPart = (
  partName: string,
  parentId?: ParentId,
  options: Partial<InsertPartOptions> = insertPartDefaultOptions,
) => {
  const mergedOptions: InsertPartOptions = {
    ...insertPartDefaultOptions,
    ...options,
  };

  mutateBlueprint((draft) => {
    const newPart = createNewPart<AnyPart>(partName);

    if (newPart) {
      if (parentId) {
        const parentPart = getPart<Group>(parentId, draft);

        if (parentPart) {
          parentPart.partOrder.splice(mergedOptions.index, 0, newPart.id);
          draft.parts.set(newPart.id, newPart);
        }
      } else {
        draft.partOrder.splice(mergedOptions.index, 0, newPart.id);
        draft.parts.set(newPart.id, newPart);
      }
    }
  });
};
