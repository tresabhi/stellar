import { invalidate } from '@react-three/fiber';
import { PartTransformEventDetail } from 'components/Canvas/components/TransformControls/components/TransformNode';
import declareBoundsUpdated from 'core/bounds/declareBoundsUpdated';
import getPart from 'core/part/getPart';
import usePartProperty from 'hooks/usePartProperty';
import { RefObject, useEffect } from 'react';
import useBlueprint from 'stores/blueprint';
import boundsStore from 'stores/bounds';
import { Object3D } from 'three';
import normalizeAngle from 'utilities/normalizeAngle';
import { Part } from './Part';
import { PartWithOrientation } from './PartWithOrientation';
import { PartWithTransformations } from './PartWithTransformations';

export interface PartWithScale {
  o: { x: number; y: number };
}

export const partWithScaleData: PartWithScale = {
  o: { x: 1, y: 1 },
};

function rotationLighting(flipLight: boolean, rotation: number) {
  if (flipLight) return normalizeAngle(rotation, true) >= 180 ? -1 : 1;
  return 1;
}
function scaleLighting(flipLight: boolean, scale: number) {
  return flipLight ? Math.abs(scale) : scale;
}

export const usePartWithScale = (
  id: string,
  object: RefObject<Object3D>,
  flipLighting = true,
) => {
  let rotation = getPart<Part & PartWithOrientation>(id)?.o?.z ?? 0;

  const handlePartTransform = (
    event: CustomEvent<PartTransformEventDetail>,
  ) => {
    const { bounds } = boundsStore[id];
    const { o } = useBlueprint.getState().parts[id] as Part & PartWithScale;
    const rotationMod = (event.detail.rotation - bounds.rotation) % Math.PI;
    let scaleX = event.detail.scale[0];
    let scaleY = event.detail.scale[1];

    if (rotationMod === Math.PI / 2 || rotationMod === -Math.PI / 2) {
      [scaleX, scaleY] = [scaleY, scaleX];
    }

    if (object.current) {
      object.current.scale.set(
        scaleLighting(flipLighting, o.x * scaleX) *
          rotationLighting(flipLighting, rotation),
        o.y * scaleY,
        object.current.scale.z,
      );
    }

    invalidate();
  };

  useEffect(() => {
    window.addEventListener(
      `parttransform${id}`,
      handlePartTransform as EventListener,
    );

    return () => {
      window.removeEventListener(
        `parttransform${id}`,
        handlePartTransform as EventListener,
      );
    };
  });

  usePartProperty(
    id,
    (part: Part & PartWithTransformations) => part.o,
    (o, prevO) => {
      rotation = o.z;
      object.current?.scale.set(
        scaleLighting(flipLighting, o.x) *
          rotationLighting(flipLighting, rotation),
        o.y,
        (Math.abs(o.x) + Math.abs(o.y)) / 2,
      );
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
