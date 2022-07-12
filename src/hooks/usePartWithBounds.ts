import { getBoundsFromObject } from 'core/bounds';
import produce from 'immer';
import { MutableRefObject, useCallback, useEffect } from 'react';
import { Group, Mesh } from 'three';
import useBounds, { BoundListing, UseBounds } from './useBounds';

const usePartWithBounds = (
  id: string,
  object: MutableRefObject<Group | Mesh>,
) => {
  const computeBounds = useCallback(() => {
    const bounds = getBoundsFromObject(object);
    const boundListing: BoundListing = {
      bounds: bounds,
      needsUpdate: false,
    };

    useBounds.setState(
      produce<UseBounds>((draft) => {
        draft.parts.set(id, boundListing);
      }),
    );
  }, [object, id]);

  useEffect(computeBounds);
  useEffect(() => {
    const unsubscribe = useBounds.subscribe(
      (state) => state.deferUpdates,
      (deferUpdates) => {
        const boundListing = useBounds.getState().parts.get(id);

        // is not deferred anymore, bound listing exists, and it needs to be updated
        if (!deferUpdates && boundListing && boundListing.needsUpdate) {
          computeBounds();
        }
      },
    );

    return unsubscribe;
  }, [computeBounds, id]);
};
export default usePartWithBounds;
