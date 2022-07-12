import { mutateBlueprint } from 'core/blueprint';
import { AnyPart, ParentId } from 'types/Parts';
import { createNewPart } from './createNewPart';

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
        const parentPart = draft.parts.get(parentId);

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
