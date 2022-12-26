import disposeBound from 'core/bounds/disposeBound';
import getBoundsFromObject from 'core/bounds/getBoundsFromObject';
import { DeferUpdatesEventDetail } from 'core/bounds/getDeferUpdates';
import { RefObject, useCallback, useEffect } from 'react';
import boundsStore from 'stores/bounds';
import { Object3D } from 'three';

const usePartWithBounds = (id: string, object: RefObject<Object3D>) => {
  const recomputeBounds = useCallback(() => {
    if (object.current) {
      const bounds = getBoundsFromObject(object.current);
      boundsStore[id] = { bounds, needsRecomputation: false };
    }

    window.dispatchEvent(new CustomEvent(`boundsupdated${id}`));
  }, [id, object]);

  useEffect(recomputeBounds);

  useEffect(() => {
    const handleDeferUpdates = (
      event: CustomEvent<DeferUpdatesEventDetail>,
    ) => {
      const listing = boundsStore[id];
      if (listing.needsRecomputation && !event.detail) recomputeBounds();
    };

    window.addEventListener(
      'deferupdates',
      handleDeferUpdates as EventListener,
    );

    return () => {
      window.removeEventListener(
        'deferupdates',
        handleDeferUpdates as EventListener,
      );
      disposeBound(id);
    };
  }, [id, recomputeBounds]);
};
export default usePartWithBounds;
