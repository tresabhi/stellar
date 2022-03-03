import { subscribeToPart } from 'interfaces/blueprint';
import { PartWithTransformations } from 'parts/Default';
import { MutableRefObject, useEffect } from 'react';
import { Group, Mesh } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import DeepPartial from 'types/DeepPartial';
import { PartID } from 'types/Parts';

const usePartTransformations = (
  ID: PartID,
  mesh: MutableRefObject<Mesh | Group>,
  overrides?: (
    state: PartWithTransformations,
  ) => DeepPartial<PartWithTransformations>,
) => {
  useEffect(() => {
    subscribeToPart(
      ID,
      (x) => (mesh.current.position.x = x),
      (state: PartWithTransformations) =>
        overrides ? overrides(state).p?.x ?? state.p.x : state.p.x,
      { fireInitially: true, unsubscribeOnUnmount: true },
    );
    subscribeToPart(
      ID,
      (y) => (mesh.current.position.y = y),
      (state: PartWithTransformations) =>
        overrides ? overrides(state).p?.y ?? state.p.y : state.p.y,
      { fireInitially: true, unsubscribeOnUnmount: true },
    );

    subscribeToPart(
      ID,
      (z) => (mesh.current.rotation.z = z),
      (state: PartWithTransformations) =>
        degToRad(overrides ? overrides(state).o?.z ?? state.o.z : state.o.z),
      { fireInitially: true, unsubscribeOnUnmount: true },
    );

    subscribeToPart(
      ID,
      (x) => (mesh.current.scale.x = x),
      (state: PartWithTransformations) =>
        overrides ? overrides(state).o?.x ?? state.o.x : state.o.x,
      { fireInitially: true, unsubscribeOnUnmount: true },
    );
    subscribeToPart(
      ID,
      (y) => (mesh.current.scale.y = y),
      (state: PartWithTransformations) =>
        overrides ? overrides(state).o?.y ?? state.o.y : state.o.y,
      { fireInitially: true, unsubscribeOnUnmount: true },
    );
  }, [ID, mesh, overrides]);
};
export default usePartTransformations;
