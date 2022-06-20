import { getBoundsFromObject } from 'core/bounds/functions/getBoundsFromObject';
import produce from 'immer';
import { MutableRefObject, useEffect } from 'react';
import { Group } from 'three';
import useBounds, { BoundListing, UseBounds } from './useBounds';

const usePartWithBounds = (id: string, group: MutableRefObject<Group>) => {
  const computeBounds = () => {
    const bounds = getBoundsFromObject(group);
    const boundListing: BoundListing = {
      bounds: bounds,
      needsUpdate: false,
    };

    useBounds.setState(
      produce<UseBounds>((draft) => {
        draft.parts.set(id, boundListing);
      }),
    );
  };

  useEffect(computeBounds);
  useEffect(() => {
    const unsubscribe = useBounds.subscribe(
      (state) => state.deferBoundUpdates,
      (deferBoundUpdates) => {
        const boundListing = useBounds.getState().parts.get(id);

        // is not deferred anymore, bound listing exists, and it needs to be updated
        if (!deferBoundUpdates && boundListing && boundListing.needsUpdate) {
          computeBounds();
        }
      },
    );

    return unsubscribe;
  }, []);
};
export default usePartWithBounds;
