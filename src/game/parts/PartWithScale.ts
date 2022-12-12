import { invalidate } from '@react-three/fiber';
import { declareBoundsUpdated } from 'core/bounds';
import { getPart, PartScaleEventDetail } from 'core/part';
import { PartResizeEventDetail } from 'core/part/resizePartAsync';
import usePartProperty from 'hooks/usePartProperty';
import { RefObject, useEffect } from 'react';
import useBlueprint from 'stores/blueprint';
import boundsStore from 'stores/bounds';
import { Object3D, Vector3 } from 'three';
import { Part, PartData, VanillaPart, VanillaPartData } from './Part';

export interface VanillaPartWithScale extends VanillaPart {
  /**
   * Scale of the part on both `x` and `y` axis
   */
  o: { x: number; y: number };
}

export interface PartWithScale extends Part, VanillaPartWithScale {}

export const VanillaPartWithScaleData: VanillaPartWithScale = {
  ...VanillaPartData,

  o: { x: 1, y: 1 },
};

export const PartWithScaleData: PartWithScale = {
  ...PartData,
  ...VanillaPartWithScaleData,

  label: 'Unlabeled Part With Scale',
};

export const usePartWithScale = (id: string, object: RefObject<Object3D>) => {
  const scale = new Vector3();

  const handlePartScale = (event: CustomEvent<PartScaleEventDetail>) => {
    if (object.current && getPart(id)?.selected) {
      object.current.scale.multiply(
        scale.set(event.detail.x, event.detail.y, 1),
      );
      invalidate();
    }
  };

  const handlePartResize = (event: CustomEvent<PartResizeEventDetail>) => {
    const part = useBlueprint.getState().parts[id] as PartWithScale;

    if (object.current) {
      object.current.scale.set(
        part.o.x * event.detail.normalizedScale[0],
        part.o.y * event.detail.normalizedScale[1],
        object.current.scale.z,
      );
    }
  };

  useEffect(() => {
    window.addEventListener('partscale', handlePartScale as EventListener);
    window.addEventListener(
      `partresize${id}`,
      handlePartResize as EventListener,
    );

    return () => {
      window.removeEventListener('partscale', handlePartScale as EventListener);
      window.removeEventListener(
        `partresize${id}`,
        handlePartResize as EventListener,
      );
    };
  });

  usePartProperty(
    id,
    (part: PartWithScale) => part.o,
    (o, prevO) => {
      object.current?.scale.set(o.x, o.y, (Math.abs(o.x) + Math.abs(o.y)) / 2);
      invalidate();

      if (object.current && boundsStore[id]) {
        const { bounds } = boundsStore[id];
        const scaleX = o.x / prevO.x;
        const scaleY = o.y / prevO.y;
        const width = bounds.width * scaleX;
        const height = bounds.height * scaleY;
        const offsetX = bounds.x - object.current.position.x;
        const offsetY = bounds.y - object.current.position.y;
        const offset = Math.hypot(offsetX, offsetY);
        const offsetRotation = Math.atan2(offsetY, offsetX);
        const offsetRotationSubbed = offsetRotation - bounds.rotation;
        const subbedOffsetX = offset * Math.cos(offsetRotationSubbed);
        const subbedOffsetY = offset * Math.sin(offsetRotationSubbed);
        const scaledOffsetX = subbedOffsetX * scaleX;
        const scaledOffsetY = subbedOffsetY * scaleY;
        const scaledOffset = Math.hypot(scaledOffsetX, scaledOffsetY);
        const scaledRotation = Math.atan2(scaledOffsetY, scaledOffsetX);
        const scaledRotationAdded = scaledRotation + bounds.rotation;
        const finalOffsetX = scaledOffset * Math.cos(scaledRotationAdded);
        const finalOffsetY = scaledOffset * Math.sin(scaledRotationAdded);
        const x = object.current.position.x + finalOffsetX;
        const y = object.current.position.y + finalOffsetY;

        bounds.x = x;
        bounds.y = y;
        bounds.width = width;
        bounds.height = height;

        declareBoundsUpdated(id);
      }
    },
    { equalityFn: (a, b) => a.x === b.x && a.y === b.y },
  );
};

export const registry = null;
