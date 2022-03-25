import PartWithTransformations from 'classes/Blueprint/parts/PartWithTransformations';
import { subscribeToPart } from 'interfaces/blueprint';
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
  callback?: () => void,
) => {
  useEffect(() => {
    subscribeToPart(
      ID,
      (x) => {
        mesh.current.position.x = x;
        callback?.();
      },
      (state: PartWithTransformations) =>
        overrides ? overrides(state).p?.x ?? state.p.x : state.p.x,
      { fireInitially: true },
    );
    subscribeToPart(
      ID,
      (y) => {
        mesh.current.position.y = y;
        callback?.();
      },
      (state: PartWithTransformations) =>
        overrides ? overrides(state).p?.y ?? state.p.y : state.p.y,
      { fireInitially: true },
    );

    subscribeToPart(
      ID,
      (z) => {
        mesh.current.rotation.z = z;
        callback?.();
      },
      (state: PartWithTransformations) =>
        degToRad(overrides ? overrides(state).o?.z ?? state.o.z : state.o.z),
      { fireInitially: true },
    );

    subscribeToPart(
      ID,
      (x) => {
        mesh.current.scale.x = x;
        callback?.();
      },
      (state: PartWithTransformations) =>
        overrides ? overrides(state).o?.x ?? state.o.x : state.o.x,
      { fireInitially: true },
    );
    subscribeToPart(
      ID,
      (y) => {
        mesh.current.scale.y = y;
        callback?.();
      },
      (state: PartWithTransformations) =>
        overrides ? overrides(state).o?.y ?? state.o.y : state.o.y,
      { fireInitially: true },
    );
  }, [ID, mesh, overrides, callback]);
};
export default usePartTransformations;
