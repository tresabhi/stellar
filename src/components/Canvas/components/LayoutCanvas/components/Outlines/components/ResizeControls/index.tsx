import { Line } from '@react-three/drei';
import { invalidate } from '@react-three/fiber';
import { DeferUpdatesEventDetail, getBoundsFromParts } from 'core/bounds';
import { useEffect, useRef } from 'react';
import useBlueprint from 'stores/blueprint';
import { Bounds } from 'stores/bounds';
import { Group } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';
import { UNIT_POINTS } from '../PartsBounds/components/PartBounds';
import { ResizeNode } from './components/ResizeNode';

export const ResizeControls = () => {
  const wrapper = useRef<Group>(null);
  const outline = useRef<Line2>(null);
  const selections = useBlueprint((state) => state.selections);
  const bounds = useRef<Bounds>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rotation: 0,
  });

  const recalculateBounds = () => {
    bounds.current = getBoundsFromParts(selections);

    outline.current?.position.set(bounds.current.x, bounds.current.y, 0);
    outline.current?.rotation.set(0, 0, bounds.current.rotation);
    outline.current?.scale.set(bounds.current.width, bounds.current.height, 1);

    window.dispatchEvent(new CustomEvent('updateresizenodes'));
    invalidate();
  };
  const debouncedRecalculateBounds = fallingEdgeDebounce(recalculateBounds, 0);

  useEffect(() => {
    const handleDeferUpdates = (
      event: CustomEvent<DeferUpdatesEventDetail>,
    ) => {
      if (wrapper.current) wrapper.current.visible = !event.detail;
    };

    debouncedRecalculateBounds();

    window.addEventListener(
      'deferupdates',
      handleDeferUpdates as EventListener,
    );
    selections.forEach((selection) => {
      window.addEventListener(
        `boundsupdated${selection}`,
        debouncedRecalculateBounds,
      );
    });

    return () => {
      window.removeEventListener(
        'deferupdates',
        handleDeferUpdates as EventListener,
      );
      selections.forEach((selection) => {
        window.removeEventListener(
          `boundsupdated${selection}`,
          debouncedRecalculateBounds,
        );
      });
    };
  });

  return (
    <group ref={wrapper} visible={selections.length > 0}>
      <Line
        ref={outline}
        lineWidth={2}
        color={'#9d5bd2'}
        points={UNIT_POINTS}
      />

      <ResizeNode // top left
        bounds={bounds}
        constant={[1, -1]}
        movable={[-1, 1]}
      />
      <ResizeNode // top
        bounds={bounds}
        constant={[0, -1]}
        movable={[0, 1]}
      />
      <ResizeNode // top right
        bounds={bounds}
        constant={[-1, -1]}
        movable={[1, 1]}
      />
      <ResizeNode // right
        bounds={bounds}
        constant={[-1, 0]}
        movable={[1, 0]}
      />
      <ResizeNode // bottom right
        bounds={bounds}
        constant={[-1, 1]}
        movable={[1, -1]}
      />
      <ResizeNode // bottom
        bounds={bounds}
        constant={[0, 1]}
        movable={[0, -1]}
      />
      <ResizeNode // bottom left
        bounds={bounds}
        constant={[1, 1]}
        movable={[-1, -1]}
      />
      <ResizeNode // left
        bounds={bounds}
        constant={[1, 0]}
        movable={[-1, 0]}
      />
    </group>
  );
};
