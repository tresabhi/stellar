import { getBoundingBox, subscribeToBoundingBox } from 'core/boundingBox';
import useApp from 'hooks/useApp';
import { PrimitiveBox2 } from 'hooks/useBoundingBoxes';
import { memo, useEffect, useRef } from 'react';
import { Line, Mesh } from 'three';
import { outlineMaterial } from './constants/outlineMaterial';
import { shadingMaterial } from './constants/shadingMaterial';
import { unitBufferGeometry2 } from './constants/unitBufferGeometry2';
import { unitPlane } from './constants/unitPlane';

export interface SelectionBoxProps {
  id: string;
}
export const SelectionBox = memo<SelectionBoxProps>(({ id }) => {
  const outline = useRef<Line>(null!);
  const shading = useRef<Mesh>(null!);
  const { canBoundingBoxesBeUpdated } = useApp();

  useEffect(() => {
    const rerender = (boundingBox: PrimitiveBox2) => {
      if (boundingBox) {
        shading.current.scale.set(
          boundingBox.max.x - boundingBox.min.x,
          boundingBox.max.y - boundingBox.min.y,
          1,
        );
        shading.current.position.set(
          boundingBox.min.x + (boundingBox.max.x - boundingBox.min.x) / 2,
          boundingBox.min.y + (boundingBox.max.y - boundingBox.min.y) / 2,
          0,
        );
        outline.current.scale.set(
          boundingBox.max.x - boundingBox.min.x,
          boundingBox.max.y - boundingBox.min.y,
          1,
        );
        outline.current.position.set(boundingBox.min.x, boundingBox.min.y, 0);
      }
    };
    const unsubscribeBoundingBox = subscribeToBoundingBox(id, (boundingBox) => {
      if (boundingBox) rerender(boundingBox);
    });
    const unsubscribeCanBoundingBoxesBeUpdated = useApp.subscribe(
      (state) => state.canBoundingBoxesBeUpdated,
      (canBoundingBoxesBeUpdated) => {
        const boundingBox = getBoundingBox(id);

        if (canBoundingBoxesBeUpdated && boundingBox) rerender(boundingBox);
        outline.current.visible = canBoundingBoxesBeUpdated;
        shading.current.visible = canBoundingBoxesBeUpdated;
      },
    );
    const initialState = getBoundingBox(id);

    if (initialState) rerender(initialState);

    return () => {
      unsubscribeBoundingBox();
      unsubscribeCanBoundingBoxesBeUpdated();
    };
  }, [id]);

  return (
    <>
      <line_
        ref={outline}
        material={outlineMaterial}
        geometry={unitBufferGeometry2}
        visible={canBoundingBoxesBeUpdated}
      />
      <mesh
        ref={shading}
        material={shadingMaterial}
        geometry={unitPlane}
        visible={canBoundingBoxesBeUpdated}
      />
    </>
  );
});

export * from './constants/color';
