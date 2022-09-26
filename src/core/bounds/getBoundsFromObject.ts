import { RefObject } from 'react';
import { PartBounds } from 'stores/useBounds';
import { Box3, Group, Mesh } from 'three';

export const getBoundsFromObject = (
  wrapper: RefObject<Group>,
  mesh: RefObject<Mesh | Group>,
) => {
  if (wrapper.current && mesh.current) {
    const meshOffset = mesh.current.position.clone();
    const wrapperRotation = wrapper.current.rotation.clone();

    mesh.current.position.set(0, 0, 0);
    wrapper.current.rotation.set(0, 0, 0);
    wrapper.current.updateMatrixWorld();

    const box3 = new Box3().setFromObject(mesh.current);

    const meshOffsetX = meshOffset.x * wrapper.current.scale.x;
    const meshOffsetY = meshOffset.y * wrapper.current.scale.y;
    const offsetHypotenuse = Math.sqrt(meshOffsetX ** 2 + meshOffsetY ** 2);
    const offsetAngleOriginal =
      Math.atan(meshOffsetY / meshOffsetX) - Math.PI / 2;
    const offsetAngle = offsetAngleOriginal - wrapperRotation.z;
    // sin and cos swapped because we're not in standard position
    const offsetX =
      offsetHypotenuse * Math.sin(offsetAngle) + wrapper.current.position.x;
    const offsetY =
      offsetHypotenuse * Math.cos(offsetAngle) + wrapper.current.position.y;

    const partBounds: PartBounds = {
      width: box3.max.x - box3.min.x,
      height: box3.max.y - box3.min.y,
      position: { x: offsetX, y: offsetY },
      rotation: -offsetAngle,
    };

    mesh.current.position.copy(meshOffset);
    wrapper.current.rotation.copy(wrapperRotation);

    return partBounds;
  }
};
