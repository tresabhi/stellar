import { mutateBlueprintVersionless } from 'core/blueprint';
import { PrimitiveBox2 } from 'game/Blueprint';

export const registerBoundingBox = (id: string, boundingBox: PrimitiveBox2) => {
  mutateBlueprintVersionless((draft) => {
    draft.boundingBoxes.set(id, boundingBox);
  });
};
