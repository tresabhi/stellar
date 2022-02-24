import usePartUpdate from 'hooks/usePartUpdate';
import { PartWithTransformations } from 'parts/Default';
import { MutableRefObject } from 'react';
import { Group, Mesh } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import { PartAddress } from 'types/Blueprint';

const usePartTransformations = (
  address: PartAddress,
  initialState: PartWithTransformations,
  mesh: MutableRefObject<Mesh | Group>,
  offsetHandler?: (state: PartWithTransformations) => number,
) => {
  usePartUpdate(address, initialState, () => {
    mesh.current.scale.set(initialState.o.x, initialState.o.y, 1);
    mesh.current.rotation.set(0, 0, degToRad(initialState.o.z));
    mesh.current.position.set(
      initialState.p.x,
      initialState.p.y + (offsetHandler ? offsetHandler(initialState) : 0),
      0,
    );
  });
};
export default usePartTransformations;
