import { invalidate } from '@react-three/fiber';
import { ORIGIN } from 'components/Canvas/components/EditControls/components/FuelTankControls';
import { PartRotateEventDetail } from 'components/Canvas/components/TransformControls/components/RotateNode';
import { PartTransformEventDetail } from 'components/Canvas/components/TransformControls/components/TransformNode';
import declareBoundsUpdated from 'core/bounds/declareBoundsUpdated';
import getPart from 'core/part/getPart';
import { PartMoveEventDetail } from 'core/part/translateSelectedAsync';
import usePartProperty from 'hooks/usePartProperty';
import { RefObject, useEffect } from 'react';
import boundsStore from 'stores/bounds';
import { Object3D, Vector2, Vector3 } from 'three';
import { Part } from './Part';

export interface PartWithPosition {
  p: { x: number; y: number };
}

export const partWithPositionData: PartWithPosition = {
  p: { x: 0, y: 0 },
};

export const usePartWithPosition = (
  id: string,
  object: RefObject<Object3D>,
) => {
  const movement = new Vector3();
  const constant = new Vector2();
  const position = new Vector2();
  const scale = new Vector2();
  const center = new Vector2();
  let { p } = getPart<Part & PartWithPosition>(id);

  const handlePartMove = (event: CustomEvent<PartMoveEventDetail>) => {
    if (getPart(id).selected) {
      if (event.detail.relative) {
        object.current?.position.add(
          movement.set(event.detail.x, event.detail.y, 0),
        );
      } else {
        object.current?.position.set(event.detail.x, event.detail.y, 0);
      }
      invalidate();
    }
  };
  const handlePartTransform = (
    event: CustomEvent<PartTransformEventDetail>,
  ) => {
    scale.set(...event.detail.scale);
    constant
      .set(...event.detail.constant)
      .rotateAround(ORIGIN, -event.detail.rotation);
    position
      .set(p.x, p.y)
      .rotateAround(ORIGIN, -event.detail.rotation)
      .sub(constant)
      .multiply(scale)
      .add(constant)
      .rotateAround(ORIGIN, event.detail.rotation);

    object.current?.position.set(position.x, position.y, 0);
    invalidate();
  };
  const handlePartRotate = (event: CustomEvent<PartRotateEventDetail>) => {
    center.set(...event.detail.center);
    position.set(p.x, p.y).rotateAround(center, event.detail.rotation);

    object.current?.position.set(position.x, position.y, 0);
    invalidate();
  };

  useEffect(() => {
    window.addEventListener('partmove', handlePartMove as EventListener);
    window.addEventListener(
      `parttransform${id}`,
      handlePartTransform as EventListener,
    );
    window.addEventListener(
      `partrotate${id}`,
      handlePartRotate as EventListener,
    );

    return () => {
      window.removeEventListener('partmove', handlePartMove as EventListener);
      window.removeEventListener(
        `parttransform${id}`,
        handlePartTransform as EventListener,
      );
      window.removeEventListener(
        'partrotate',
        handlePartRotate as EventListener,
      );
    };
  });

  usePartProperty(
    id,
    (part: Part & PartWithPosition) => part.p,
    (nextP, prevP) => {
      p = nextP;
      object.current?.position.set(nextP.x, nextP.y, 0);
      invalidate();

      if (object.current && boundsStore[id]) {
        const { bounds } = boundsStore[id];

        bounds.x += nextP.x - prevP.x;
        bounds.y += nextP.y - prevP.y;

        declareBoundsUpdated(id);
      }
    },
  );
};
