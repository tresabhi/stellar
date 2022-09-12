import { mutateBounds } from 'core/app';
import { MutableRefObject } from 'react';
import { Group, Mesh } from 'three';
import { getBoundsFromObject } from './getBoundsFromObject';

export const updateBounds = (
  id: string,
  wrapper: MutableRefObject<Group>,
  mesh: MutableRefObject<Mesh>,
) => {
  const bounds = getBoundsFromObject(wrapper, mesh);

  mutateBounds((draft) => {
    const boundListing = draft.parts.get(id);

    if (boundListing) {
      boundListing.bounds = bounds;
      boundListing.needsUpdate = false;
    }
  });
};
