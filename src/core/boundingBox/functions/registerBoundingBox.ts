import { mutateBlueprintVersionless } from 'core/blueprint';
import { PrimitiveBox2 } from 'game/Blueprint';
import { UUID } from 'types/Parts';

export const registerBoundingBox = (ID: UUID, boundingBox: PrimitiveBox2) => {
  mutateBlueprintVersionless((draft) => {
    draft.boundingBoxes[ID] = boundingBox;
  });
};
