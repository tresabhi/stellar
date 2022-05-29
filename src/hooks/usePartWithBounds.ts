import { computePartBound } from 'core/bounds';
import { MutableRefObject, useEffect } from 'react';
import { Group } from 'three';
import useApp from './useApp';

const usePartWithBounds = (id: string, group: MutableRefObject<Group>) => {
  useEffect(() => {
    computePartBound(id, group);

    const unsubscribeCanBoundsBeUpdated = useApp.subscribe(
      (state) => state.canBoundsBeUpdated,
      (canBoundsBeUpdated) => {
        if (canBoundsBeUpdated) computePartBound(id, group);
      },
    );

    return unsubscribeCanBoundsBeUpdated;
  }, [id, group]);
};
export default usePartWithBounds;
