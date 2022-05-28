import useBoundingBoxes from 'hooks/useBoundingBoxes';
import { useEffect, useRef } from 'react';
import { Line } from 'three';
import { outlineMaterial } from './SelectionBoxes/components/SelectionBox/constants/outlineMaterial';
import { unitBufferGeometry2 } from './SelectionBoxes/components/SelectionBox/constants/unitBufferGeometry2';

export const FullSelectionOutline = () => {
  const outline = useRef<Line>(null!);

  useEffect(() => {
    return useBoundingBoxes.subscribe(
      (state) => state.selectionBound,
      (selectionBound) => {
        if (selectionBound) {
          outline.current.scale.set(
            selectionBound.max.x - selectionBound.min.x,
            selectionBound.max.y - selectionBound.min.y,
            1,
          );
          outline.current.position.set(
            selectionBound.min.x,
            selectionBound.min.y,
            0,
          );
        } else {
          outline.current.visible = false;
        }
      },
    );
  }, []);

  return (
    <line_
      visible={useBoundingBoxes().selectionBound !== null}
      ref={outline}
      material={outlineMaterial}
      geometry={unitBufferGeometry2}
    />
  );
};
