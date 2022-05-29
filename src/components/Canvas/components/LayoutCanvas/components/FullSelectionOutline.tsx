import { computeSelectionBound, disposeSelectionBound } from 'core/bounds';
import useApp from 'hooks/useApp';
import useBlueprint from 'hooks/useBlueprint';
import useBounds from 'hooks/useBounds';
import { useEffect, useRef } from 'react';
import { Line } from 'three';
import { outlineMaterial } from './SelectionBoxes/components/SelectionBox/constants/outlineMaterial';
import { unitBufferGeometry2 } from './SelectionBoxes/components/SelectionBox/constants/unitBufferGeometry2';

export const FullSelectionOutline = () => {
  const outline = useRef<Line>(null!);

  useEffect(() => {
    const unsubscribeSelectionBound = useBounds.subscribe(
      (state) => state.selection,
      (selectionBound) => {
        console.log('selectionBound', selectionBound);

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
    const unsubscribeSelections = useBlueprint.subscribe(
      (state) => state.selections,
      (selections) => {
        if (selections.length > 1) {
          computeSelectionBound();
        } else {
          disposeSelectionBound();
        }
      },
    );
    const unsubscribeCanBoundsBeUpdated = useApp.subscribe(
      (state) => state.canBoundsBeUpdated,
      (canBoundsBeUpdated) => {
        outline.current.visible = canBoundsBeUpdated;
      },
    );

    return () => {
      unsubscribeSelectionBound();
      unsubscribeSelections();
      unsubscribeCanBoundsBeUpdated();
    };
  }, []);

  return (
    <line_
      visible={useBounds().selection !== null}
      ref={outline}
      material={outlineMaterial}
      geometry={unitBufferGeometry2}
    />
  );
};
