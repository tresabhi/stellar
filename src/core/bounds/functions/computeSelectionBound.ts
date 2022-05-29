import useBlueprint from 'hooks/useBlueprint';
import useBounds, { PrimitiveBound } from 'hooks/useBounds';
import { getPartBound } from './getPartBound';
import { unionBounds } from './unionBounds';

export const computeSelectionBound = () => {
  const { selections } = useBlueprint.getState();

  if (selections.length > 1) {
    let bound: PrimitiveBound | null = null;

    selections.forEach((selection) => {
      const gottenBound = getPartBound(selection);

      if (gottenBound) {
        if (bound) {
          bound = unionBounds(bound, gottenBound);
        } else {
          bound = gottenBound;
        }
      }
    });

    useBounds.setState({ selection: bound });
  } else {
    useBounds.setState({ selection: null });
  }
};
