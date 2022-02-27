import { subscribeToPart } from 'interfaces/blueprint';
import { PartWithTransformations } from 'parts/Default';
import { MutableRefObject, useEffect } from 'react';
import { Group, Mesh } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import { PartAddress } from 'types/Blueprint';

const usePartTransformations = (
  address: PartAddress,
  mesh: MutableRefObject<Mesh | Group>,
  offsetHandler?: (state: PartWithTransformations) => number,
) => {
  useEffect(() => {
    subscribeToPart(
      address,
      (x) => (mesh.current.position.x = x),
      (state: PartWithTransformations) => state.p.x,
      true,
    );
    subscribeToPart(
      address,
      (y) => (mesh.current.position.y = y),
      (state: PartWithTransformations) =>
        state.p.y + (offsetHandler ? offsetHandler(state) : 0),
      true,
    );

    subscribeToPart(
      address,
      (z) => (mesh.current.rotation.z = z),
      (state: PartWithTransformations) => degToRad(state.o.z),
      true,
    );

    subscribeToPart(
      address,
      (x) => (mesh.current.scale.x = x),
      (state: PartWithTransformations) => state.o.x,
      true,
    );
    subscribeToPart(
      address,
      (y) => (mesh.current.scale.y = y),
      (state: PartWithTransformations) => state.o.y,
      true,
    );
  }, [address, mesh, offsetHandler]);
};
export default usePartTransformations;
