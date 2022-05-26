import { PrimitiveBox2 } from 'game/Blueprint';
import useApp from 'hooks/useApp';
import useBlueprint from 'hooks/useBlueprint';
import { cloneDeep } from 'lodash';
import { useEffect, useRef } from 'react';
import { Line } from 'three';
import { outlineMaterial } from './SelectionBoxes/components/SelectionBox/constants/outlineMaterial';
import { unitBufferGeometry2 } from './SelectionBoxes/components/SelectionBox/constants/unitBufferGeometry2';

export const FullSelectionOutline = () => {
  const outline = useRef<Line>(null!);
  let rerendersEnabled = useRef(true);

  useEffect(() => {
    const rerender = () => {
      const { selections, boundingBoxes } = useBlueprint.getState();

      if (selections.length > 1) {
        let unionBoundingBox: PrimitiveBox2 = {
          min: { x: 0, y: 0 },
          max: { x: 0, y: 0 },
        };

        selections.forEach((selection, index) => {
          const boundingBox = boundingBoxes.get(selection);

          if (boundingBox) {
            if (index === 0) {
              unionBoundingBox = cloneDeep(boundingBox);
            } else {
              if (boundingBox.min.x < unionBoundingBox.min.x)
                unionBoundingBox.min.x = boundingBox.min.x;
              if (boundingBox.min.y < unionBoundingBox.min.y)
                unionBoundingBox.min.y = boundingBox.min.y;
              if (boundingBox.max.x > unionBoundingBox.max.x)
                unionBoundingBox.max.x = boundingBox.max.x;
              if (boundingBox.max.y > unionBoundingBox.max.y)
                unionBoundingBox.max.y = boundingBox.max.y;
            }
          }
        });

        outline.current.scale.set(
          unionBoundingBox.max.x - unionBoundingBox.min.x,
          unionBoundingBox.max.y - unionBoundingBox.min.y,
          1,
        );
        outline.current.position.set(
          unionBoundingBox.min.x,
          unionBoundingBox.min.y,
          0,
        );
      } else {
        outline.current.visible = false;
      }
    };

    const unsubscribeSelections = useBlueprint.subscribe(
      (state) => state.selections,
      rerender,
    );
    const unsubscribeIsTranslating = useApp.subscribe(
      (state) => state.areBoundingBoxesUpdating,
      (isTranslating) => {
        if (!rerendersEnabled.current && !isTranslating) {
          // translating has now stopped
          rerender();
        }

        rerendersEnabled.current = !isTranslating;
        outline.current.visible = rerendersEnabled.current;
      },
    );

    return () => {
      unsubscribeSelections();
      unsubscribeIsTranslating();
    };
  }, []);

  return (
    <line_
      ref={outline}
      material={outlineMaterial}
      geometry={unitBufferGeometry2}
    />
  );
};
