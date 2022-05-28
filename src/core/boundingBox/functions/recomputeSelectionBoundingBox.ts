import useBlueprint from 'hooks/useBlueprint';
import useBoundingBoxes, { PrimitiveBox2 } from 'hooks/useBoundingBoxes';
import { getBoundingBox } from './getBoundingBox';
import { union } from './union';

export const recomputeSelectionBoundingBox = () => {
  const { selections } = useBlueprint.getState();

  if (selections.length > 1) {
    let boundingBox: PrimitiveBox2 | null = null;

    selections.forEach((selection) => {
      const gotBoundingBox = getBoundingBox(selection);

      if (gotBoundingBox) {
        if (boundingBox) {
          boundingBox = union(boundingBox, gotBoundingBox);
        } else {
          boundingBox = gotBoundingBox;
        }
      }
    });

    useBoundingBoxes.setState({ selectionBound: boundingBox });
  } else {
    useBoundingBoxes.setState({ selectionBound: null });
  }
};
