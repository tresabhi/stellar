import { PrimitiveBox2 } from 'game/Blueprint';
import useApp from 'hooks/useApp';
import useBlueprint from 'hooks/useBlueprint';
import { memo, useEffect, useRef } from 'react';
import { Line, Mesh } from 'three';
import { UUID } from 'types/Parts';
import { outlineMaterial } from './constants/outlineMaterial';
import { shadingMaterial } from './constants/shadingMaterial';
import { unitBufferGeometry2 } from './constants/unitBufferGeometry2';
import { unitPlane } from './constants/unitPlane';

export interface SelectionBoxProps {
  ID: UUID;
}
export const SelectionBox = memo<SelectionBoxProps>(({ ID }) => {
  const outline = useRef<Line>(null!);
  const shading = useRef<Mesh>(null!);
  let rerendersEnabled = useRef(true);

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
    const unsubscribeBoundingBox = useBlueprint.subscribe(
      (state) => state.boundingBoxes.get(ID),
      (boundingBox) => {
        if (rerendersEnabled.current && boundingBox) rerender(boundingBox);
      },
    );
    const unsubscribeIsTranslating = useApp.subscribe(
      (state) => state.isTranslating,
      (isTranslating) => {
        if (!rerendersEnabled.current && !isTranslating) {
          // translating has now stopped
          const boundingBox = useBlueprint.getState().boundingBoxes.get(ID);
          if (boundingBox) rerender(boundingBox);
        }

        rerendersEnabled.current = !isTranslating;
        outline.current.visible = rerendersEnabled.current;
        shading.current.visible = rerendersEnabled.current;
      },
    );
    const initialState = useBlueprint.getState().boundingBoxes.get(ID);

    if (initialState) rerender(initialState);

    return () => {
      unsubscribeBoundingBox();
      unsubscribeIsTranslating();
    };
  }, [ID]);

  return (
    <>
      <line_
        ref={outline}
        material={outlineMaterial}
        geometry={unitBufferGeometry2}
      />
      <mesh ref={shading} material={shadingMaterial} geometry={unitPlane} />
    </>
  );
});

export * from './constants/color';
