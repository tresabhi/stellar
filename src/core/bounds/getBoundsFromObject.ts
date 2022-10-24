import { RefObject } from 'react';
import { PartBounds } from 'stores/useBounds';
import { Box3, Object3D } from 'three';

export const getBoundsFromObject = (object: RefObject<Object3D>) => {
  if (object.current) {
    const rotation = object.current.rotation.z;

    object.current.rotation.z = 0;
    object.current.updateMatrixWorld();

    const box3 = new Box3().setFromObject(object.current);
    const width = box3.max.x - box3.min.x;
    const height = box3.max.y - box3.min.y;
    const boundsX = (box3.max.x + box3.min.x) / 2;
    const boundsY = (box3.max.y + box3.min.y) / 2;
    const offsetX = boundsX - object.current.position.x;
    const offsetY = boundsY - object.current.position.y;
    const offset = Math.sqrt(offsetX ** 2 + offsetY ** 2);
    const offsetRotation = Math.atan2(offsetY, offsetX) + rotation;
    const x = offset * Math.cos(offsetRotation) + object.current.position.x;
    const y = offset * Math.sin(offsetRotation) + object.current.position.y;

    object.current.rotation.z = rotation;

    const partBounds: PartBounds = { width, height, x, y, rotation };

    return partBounds;
  }
};
