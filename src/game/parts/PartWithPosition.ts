import { invalidate } from '@react-three/fiber';
import declareBoundsUpdated from 'core/bounds/declareBoundsUpdated';
import getPart from 'core/part/getPart';
import { PartResizeEventDetail } from 'core/part/resizePartAsync';
import { PartMoveEventDetail } from 'core/part/translateSelectedAsync';
import usePartProperty from 'hooks/usePartProperty';
import { RefObject, useEffect } from 'react';
import useBlueprint from 'stores/blueprint';
import boundsStore from 'stores/bounds';
import { Object3D, Vector3 } from 'three';
import {
  Part, PartData, VanillaPart, VanillaPartData,
} from './Part';

export interface VanillaPartWithPosition extends VanillaPart {
  /**
   * Position of the part in `x` and `y` axis
   */
  p: { x: number; y: number };
}

export interface PartWithPosition extends Part, VanillaPartWithPosition {}

export const VanillaPartWithPositionData: VanillaPartWithPosition = {
  ...VanillaPartData,

  p: { x: 0, y: 0 },
};

export const PartWithPositionData: PartWithPosition = {
  ...PartData,
  ...VanillaPartWithPositionData,

  label: 'Unlabeled Part With Translations',
};

export const usePartWithPosition = (
  id: string,
  object: RefObject<Object3D>,
) => {
  const movement = new Vector3();

  const handlePartMove = (event: CustomEvent<PartMoveEventDetail>) => {
    if (getPart(id)?.selected) {
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

  const handlePartResize = (event: CustomEvent<PartResizeEventDetail>) => {
    const part = useBlueprint.getState().parts[id] as PartWithPosition;

    const originOffset = Math.hypot(part.p.x, part.p.y);
    const originAngle = Math.atan2(part.p.y, part.p.x) - event.detail.rotation;
    const rotatedOriginX = originOffset * Math.cos(originAngle);
    const rotatedOriginY = originOffset * Math.sin(originAngle);
    const offsetX = rotatedOriginX - event.detail.normalizedConstant[0];
    const offsetY = rotatedOriginY - event.detail.normalizedConstant[1];
    const scaledOffsetX = offsetX * event.detail.normalizedScale[0]
      + event.detail.normalizedConstant[0];
    const scaledOffsetY = offsetY * event.detail.normalizedScale[1]
      + event.detail.normalizedConstant[1];
    const scaledOffset = Math.hypot(scaledOffsetX, scaledOffsetY);
    const scaledAngle = Math.atan2(scaledOffsetY, scaledOffsetX) + event.detail.rotation;
    const x = scaledOffset * Math.cos(scaledAngle);
    const y = scaledOffset * Math.sin(scaledAngle);

    if (object.current) {
      object.current.position.set(x, y, object.current.position.z);
    }
  };

  useEffect(() => {
    window.addEventListener('partmove', handlePartMove as EventListener);
    window.addEventListener(
      `partresize${id}`,
      handlePartResize as EventListener,
    );

    return () => {
      window.removeEventListener('partmove', handlePartMove as EventListener);
      window.removeEventListener(
        `partresize${id}`,
        handlePartResize as EventListener,
      );
    };
  });

  usePartProperty(
    id,
    (part: PartWithPosition) => part.p,
    (p, prevP) => {
      object.current?.position.set(p.x, p.y, 0);
      invalidate();

      if (object.current && boundsStore[id]) {
        const { bounds } = boundsStore[id];

        bounds.x += p.x - prevP.x;
        bounds.y += p.y - prevP.y;

        declareBoundsUpdated(id);
      }
    },
  );
};

export const registry = null;
