import { disposeBound, getBoundsFromObject } from 'core/bounds';
import { DeferUpdatesEventDetail } from 'core/bounds/deferUpdates';
import { RefObject, useEffect } from 'react';
import boundsStore from 'stores/bounds';
import { Object3D } from 'three';

const usePartWithBounds = (id: string, object: RefObject<Object3D>) => {
  const recomputeBounds = () => {
    if (object.current) {
      const bounds = getBoundsFromObject(object.current);
      boundsStore[id] = { bounds, needsRecomputation: false };
    }

    window.dispatchEvent(new CustomEvent(`updatebounds${id}`));
  };

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
  }, []);
};
export default usePartWithBounds;
