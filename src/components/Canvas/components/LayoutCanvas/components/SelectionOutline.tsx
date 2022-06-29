import useBlueprint from 'hooks/useBlueprint';
import useBounds, { PrimitiveBounds } from 'hooks/useBounds';
import { useEffect, useRef } from 'react';
import { Line } from 'three';
import { outlineMaterial, unitBufferGeometry2 } from './PartBounds';

export const SelectionOutline = () => {
  const outline = useRef<Line>(null!);
  const selections = useBlueprint((state) => state.selections);
  const deferUpdates = useBounds((state) => state.deferUpdates);
  const visible = selections.length > 1 && !deferUpdates;

  useEffect(() => {
    if (visible) {
      let selectionBounds: PrimitiveBounds;
      const partBounds = useBounds.getState().parts;

      selections.forEach((selection, index) => {
        const partBound = partBounds.get(selection);

        if (partBound) {
          if (index === 0) {
            selectionBounds = partBound.bounds;
          } else {
            selectionBounds = {
              min: {
                x: Math.min(selectionBounds.min.x, partBound.bounds.min.x),
                y: Math.min(selectionBounds.min.y, partBound.bounds.min.y),
              },
              max: {
                x: Math.max(selectionBounds.max.x, partBound.bounds.max.x),
                y: Math.max(selectionBounds.max.y, partBound.bounds.max.y),
              },
            };
          }
        }
      });

      if (selectionBounds!) {
        outline.current.scale.set(
          selectionBounds!.max.x - selectionBounds!.min.x,
          selectionBounds!.max.y - selectionBounds!.min.y,
          1,
        );
        outline.current.position.set(
          selectionBounds!.min.x,
          selectionBounds!.min.y,
          0,
        );
      }
    }
  });

  return visible ? (
    <line_
      ref={outline}
      material={outlineMaterial}
      geometry={unitBufferGeometry2}
    />
  ) : null;
};
