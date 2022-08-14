import { getBoundsFromObject } from 'core/bounds';
import produce from 'immer';
import { MutableRefObject, useCallback, useEffect } from 'react';
import useBounds, { BoundListing, UseBounds } from 'stores/useBounds';
import { Group, Mesh } from 'three';

const usePartWithBounds = (
  id: string,
  wrapper: MutableRefObject<Group>,
  mesh: MutableRefObject<Mesh>,
) => {
  const computeBounds = useCallback(() => {
    const bounds = getBoundsFromObject(wrapper, mesh);
    const boundListing: BoundListing = {
      bounds: bounds,
      needsUpdate: false,
    };

    useBounds.setState(
      produce<UseBounds>((draft) => {
        draft.parts.set(id, boundListing);
      }),
    );
  }, [id, mesh, wrapper]);

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
