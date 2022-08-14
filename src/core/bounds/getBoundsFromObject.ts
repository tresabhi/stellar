import { MutableRefObject } from 'react';
import { PartBounds } from 'stores/useBounds';
import { Box3, Group, Mesh } from 'three';

export const getBoundsFromObject = (wrapper: MutableRefObject<Group>, mesh: MutableRefObject<Mesh>) => {
  const position = mesh.current.position.toArray();
  const rotation = wrapper.current.rotation.toArray();

  mesh.current.position.set(0, 0, 0);
  wrapper.current.rotation.set(0, 0, 0);
  wrapper.current.updateMatrixWorld();

  const box3 = new Box3().setFromObject(mesh.current);
  const partBounds: PartBounds = {
    min: { x: box3.min.x, y: box3.min.y },
    max: { x: box3.max.x, y: box3.max.y },
    offset: { x: position[0], y: position[1] },
    rotation: rotation[2],
  };

  mesh.current.position.set(...position);
  wrapper.current.rotation.set(rotation[0], rotation[1], rotation[2]);

  return partBounds;
};
