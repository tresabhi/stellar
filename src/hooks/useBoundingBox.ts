import { registerBoundingBox } from 'core/boundingBox';
import { MutableRefObject, useEffect } from 'react';
import { Box3, Group, Mesh } from 'three';
import { UUID } from 'types/Parts';

const useBoundingBox = (ID: UUID, mesh: MutableRefObject<Mesh | Group>) => {
  useEffect(() => {
    const box3 = new Box3();

    box3.setFromObject(mesh.current);
    registerBoundingBox(ID, {
      min: {
        x: box3.min.x,
        y: box3.min.y,
      },
      max: {
        x: box3.max.x,
        y: box3.max.y,
      },
    });
  });
};
export default useBoundingBox;
