import { computePartBound } from 'core/bounds';
import { MutableRefObject, useEffect } from 'react';
import { Group } from 'three';

const usePartWithBounds = (id: string, group: MutableRefObject<Group>) => {
  useEffect(() => {
    computePartBound(id, group);
  }, [id, group]);
};
export default usePartWithBounds;
