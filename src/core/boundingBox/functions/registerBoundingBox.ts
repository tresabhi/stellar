import ImmerableBox2 from 'classes/ImmerableBox2';
import { getPart } from 'core/part';
import useBoundingBoxes from 'hooks/useBoundingBoxes';
import { UUID } from 'types/Parts';

export const registerBoundingBox = (ID: UUID, boundingBox: ImmerableBox2) => {
  const part = getPart(ID);

  if (part) {
    useBoundingBoxes.setState((state) => {
      state[ID] = boundingBox;
    });
  }
};
