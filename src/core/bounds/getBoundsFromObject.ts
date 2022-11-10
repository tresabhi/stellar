import { Bounds } from 'stores/bounds';
import { Box3, Object3D } from 'three';

export const getBoundsFromObject = (object: Object3D) => {
  const rotation = object.rotation.z;

  object.rotation.z = 0;
  object.updateMatrixWorld();

  const box3 = new Box3().setFromObject(object);
  const width = box3.max.x - box3.min.x;
  const height = box3.max.y - box3.min.y;
  const boundsX = (box3.max.x + box3.min.x) / 2;
  const boundsY = (box3.max.y + box3.min.y) / 2;
  const offsetX = boundsX - object.position.x;
  const offsetY = boundsY - object.position.y;
  const offset = Math.sqrt(offsetX ** 2 + offsetY ** 2);
  const offsetRotation = Math.atan2(offsetY, offsetX) + rotation;
  const x = offset * Math.cos(offsetRotation) + object.position.x;
  const y = offset * Math.sin(offsetRotation) + object.position.y;

  object.rotation.z = rotation;

  const partBounds: Bounds = { width, height, x, y, rotation };

  return partBounds;
};
