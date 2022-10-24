import { mutateBounds } from 'core/app';
import { disposeBound, getBoundsFromObject } from 'core/bounds';
import { RefObject, useCallback, useEffect } from 'react';
import useBounds from 'stores/useBounds';
import { Object3D } from 'three';

const usePartWithBounds = (id: string, object: RefObject<Object3D>) => {
  const computeBounds = useCallback(() => {
    const bounds = getBoundsFromObject(object);

    if (bounds) {
      mutateBounds((draft) => {
        draft.parts.set(id, {
          bounds: bounds,
          needsUpdate: false,
        });
      });
    }
  }, [id, object]);

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

    return () => {
      unsubscribe();
      disposeBound(id);
    };
  }, [computeBounds, id]);
};
export default usePartWithBounds;
