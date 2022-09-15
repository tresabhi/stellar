import { mutateBounds } from 'core/app';
import { MutableRefObject } from 'react';
import { Group, Mesh } from 'three';
import { getBoundsFromObject } from './getBoundsFromObject';

export const updateBounds = (
  id: string,
  wrapper: MutableRefObject<Group>,
  mesh: MutableRefObject<Mesh>,
) => {
  mutateBounds((draft) => {
    const boundListing = draft.parts.get(id);
    const bounds = getBoundsFromObject(wrapper, mesh);

    if (bounds && boundListing) {
      boundListing.bounds = bounds;
      boundListing.needsUpdate = false;
    }
  });
};
