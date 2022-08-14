import { mutateBlueprint } from 'core/blueprint';
import { AnyPart, ParentId } from 'types/Parts';
import { createNewPart } from './createNewPart';
import { selectPartOnly } from './selectPartOnly';

export interface InsertPartOptions {
  index: number;
  // TODO: implement this feature
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
    const newPart = createNewPart<AnyPart>(partName);

    if (newPart) {
      if (parentId) {
        const parentPart = draft.parts.get(parentId);

        if (parentPart) {
          parentPart.partOrder.splice(mergedOptions.index, 0, newPart.id);
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
