import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { UUID } from 'types/Parts';
import { mutateParts } from './mutateParts';

export const translateParts = (IDs: UUID[], x: number, y: number) => {
  mutateParts<PartWithTransformations>(IDs, (draft) => {
    draft.p.x += x;
    draft.p.y += y;
  });
};
