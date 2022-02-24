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
  usePartUpdate(address, initialState, (state) => {
    mesh.current.scale.set(state.o.x, state.o.y, 1);
    mesh.current.rotation.set(0, 0, degToRad(state.o.z));
    mesh.current.position.set(
      state.p.x,
      state.p.y + (offsetHandler ? offsetHandler(state) : 0),
      0,
    );
  });
};
export default usePartTransformations;
