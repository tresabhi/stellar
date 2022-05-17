import { getPart } from 'core/part';
import useBoundingBoxes, {
  PrimitiveBox2,
  UseBoundingBoxes,
} from 'hooks/useBoundingBoxes';
import produce from 'immer';
import { UUID } from 'types/Parts';

export const registerBoundingBox = (ID: UUID, boundingBox: PrimitiveBox2) => {
  const part = getPart(ID);

  if (part) {
    // TODO: replace all produce(state: Type) with produce<Type>(state)
    useBoundingBoxes.setState(
      produce<UseBoundingBoxes>((state) => {
        state[ID] = boundingBox;
      }),
    );
  }
};
