import { mutateBounds } from 'core/app';
import { getBoundsFromObject } from 'core/bounds';
import { RefObject, useCallback, useEffect } from 'react';
import useBounds from 'stores/useBounds';
import { Group, Mesh } from 'three';

const usePartWithBounds = (
  id: string,
  wrapper: RefObject<Group>,
  mesh: RefObject<Mesh>,
) => {
  const computeBounds = useCallback(() => {
    const bounds = getBoundsFromObject(wrapper, mesh);

    if (bounds) {
      mutateBounds((draft) => {
        draft.parts.set(id, {
          bounds: bounds,
          needsUpdate: false,
        });
      });
    }
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
