import { invalidate } from '@react-three/fiber';
import { declareBoundsUpdated } from 'core/bounds';
import { getPart, PartMoveEventDetail } from 'core/part';
import { PartResizeEventDetail } from 'core/part/resizePartAsync';
import usePartProperty from 'hooks/usePartProperty';
import { RefObject, useEffect } from 'react';
import useBlueprint from 'stores/blueprint';
import boundsStore from 'stores/bounds';
import { Object3D, Vector3 } from 'three';
import { Part, PartData, VanillaPart, VanillaPartData } from './Part';

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

    const offsetX = part.p.x - event.detail.constant[0];
    const offsetY = part.p.y - event.detail.constant[1];
    const scaledOffsetX = offsetX * event.detail.scale[0];
    const scaledOffsetY = offsetY * event.detail.scale[1];
    const x = event.detail.constant[0] + scaledOffsetX;
    const y = event.detail.constant[1] + scaledOffsetY;

    object.current?.position.set(x, y, 0);
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
