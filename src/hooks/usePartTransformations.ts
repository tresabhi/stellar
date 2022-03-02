import { subscribeToPart } from 'interfaces/blueprint';
import { PartWithTransformations } from 'parts/Default';
import { MutableRefObject, useEffect } from 'react';
import { Group, Mesh } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import { PartAddress } from 'types/Blueprint';
import DeepPartial from 'types/DeepPartial';

const usePartTransformations = (
  address: PartAddress,
  mesh: MutableRefObject<Mesh | Group>,
  overrides?: (
    state: PartWithTransformations,
  ) => DeepPartial<PartWithTransformations>,
) => {
  useEffect(() => {
    subscribeToPart(
      address,
      (x) => (mesh.current.position.x = x),
      (state: PartWithTransformations) =>
        overrides ? overrides(state).p?.x ?? state.p.x : state.p.x,
      true,
    );
    subscribeToPart(
      address,
      (y) => (mesh.current.position.y = y),
      (state: PartWithTransformations) =>
        overrides ? overrides(state).p?.y ?? state.p.y : state.p.y,
      true,
    );

    subscribeToPart(
      address,
      (z) => (mesh.current.rotation.z = z),
      (state: PartWithTransformations) =>
        degToRad(overrides ? overrides(state).o?.z ?? state.o.z : state.o.z),
      true,
    );

    subscribeToPart(
      address,
      (x) => (mesh.current.scale.x = x),
      (state: PartWithTransformations) =>
        overrides ? overrides(state).o?.x ?? state.o.x : state.o.x,
      true,
    );
    subscribeToPart(
      address,
      (y) => (mesh.current.scale.y = y),
      (state: PartWithTransformations) =>
        overrides ? overrides(state).o?.y ?? state.o.y : state.o.y,
      true,
    );
  }, [address, mesh, overrides]);
};
export default usePartTransformations;
