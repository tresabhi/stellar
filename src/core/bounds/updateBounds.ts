import produce from 'immer';
import { MutableRefObject } from 'react';
import useBounds, { UseBounds } from 'stores/useBounds';
import { Group, Mesh } from 'three';
import { getBoundsFromObject } from './getBoundsFromObject';

export const updateBounds = (
  id: string,
  wrapper: MutableRefObject<Group>,
  mesh: MutableRefObject<Mesh>,
) => {
  const bounds = getBoundsFromObject(wrapper, mesh);

  useBounds.setState(
    produce<UseBounds>((draft) => {
      const boundListing = draft.parts.get(id);

      if (boundListing) {
        boundListing.bounds = bounds;
        boundListing.needsUpdate = false;
      }
    }),
  );
};
