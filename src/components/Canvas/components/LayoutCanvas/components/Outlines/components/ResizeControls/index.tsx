import { Line } from '@react-three/drei';
import { DeferUpdatesEventDetail } from 'core/bounds';
import { useEffect, useRef } from 'react';
import useBlueprint from 'stores/blueprint';
import boundsStore, { Bounds } from 'stores/bounds';
import { Box2, Group, Vector2 } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';
import { UNIT_POINTS } from '../PartsBounds/components/PartBounds';
import { ResizeNode, sideToPoint } from './components/ResizeNode';

const DEBOUNCE_TIME = 10;

export const ResizeControls = () => {
  const wrapper = useRef<Group>(null);
  const outline = useRef<Line2>(null);
  const selections = useBlueprint((state) => state.selections);
  const selectionBounds = useRef<Bounds>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rotation: 0,
  });

  const resize = () => {
    outline.current?.position.set(
      selectionBounds.current.x,
      selectionBounds.current.y,
      0,
    );
    outline.current?.rotation.set(0, 0, selectionBounds.current.rotation);
    outline.current?.scale.set(
      selectionBounds.current.width,
      selectionBounds.current.height,
      1,
    );

    if (wrapper.current) wrapper.current.visible = true;
  };

  const debouncedResize = fallingEdgeDebounce(() => {
    if (selections.length === 1) {
      selectionBounds.current = boundsStore[selections[0]].bounds;
      resize();
    } else {
      const box2 = new Box2();
      const point = new Vector2();

      selections.forEach((selection) => {
        const { bounds } = boundsStore[selection];

        box2
          .expandByPoint(point.set(...sideToPoint(bounds, [-1, 1])))
          .expandByPoint(point.set(...sideToPoint(bounds, [1, 1])))
          .expandByPoint(point.set(...sideToPoint(bounds, [1, -1])))
          .expandByPoint(point.set(...sideToPoint(bounds, [-1, -1])));
      });

      selectionBounds.current = {
        width: box2.max.x - box2.min.x,
        height: box2.max.y - box2.min.y,
        x: (box2.min.x + box2.max.x) / 2,
        y: (box2.min.y + box2.max.y) / 2,
        rotation: 0,
      };
      resize();
    }
  }, DEBOUNCE_TIME);

  useEffect(() => {
    const callbacks: Record<string, EventListener> = {};
    selections.forEach((selection) => {
      callbacks[selection] = () => {
        debouncedResize();
        if (wrapper.current) wrapper.current.visible = false;
      };

      window.addEventListener(
        `boundsupdated${selection}`,
        callbacks[selection],
      );
    });

    const handleDeferUpdates = (
      event: CustomEvent<DeferUpdatesEventDetail>,
    ) => {
      if (event.detail && wrapper.current) wrapper.current.visible = false;
    };

    window.addEventListener(
      'deferupdates',
      handleDeferUpdates as EventListener,
    );

    return () => {
      for (const id in callbacks) {
        window.removeEventListener(`boundsupdated${id}`, callbacks[id]);
      }

      window.removeEventListener(
        'deferupdates',
        handleDeferUpdates as EventListener,
      );
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
        bounds={selectionBounds}
        constant={[1, -1]}
        movable={[-1, 1]}
      />
      <ResizeNode // top
        bounds={selectionBounds}
        constant={[0, -1]}
        movable={[0, 1]}
        maintainSlope
      />
      <ResizeNode // top right
        bounds={selectionBounds}
        constant={[-1, -1]}
        movable={[1, 1]}
      />
      <ResizeNode // right
        bounds={selectionBounds}
        constant={[-1, 0]}
        movable={[1, 0]}
        maintainSlope
      />
      <ResizeNode // bottom right
        bounds={selectionBounds}
        constant={[-1, 1]}
        movable={[1, -1]}
      />
      <ResizeNode // bottom
        bounds={selectionBounds}
        constant={[0, 1]}
        movable={[0, -1]}
        maintainSlope
      />
      <ResizeNode // bottom left
        bounds={selectionBounds}
        constant={[1, 1]}
        movable={[-1, -1]}
      />
      <ResizeNode // left
        bounds={selectionBounds}
        constant={[1, 0]}
        movable={[-1, 0]}
        maintainSlope
      />
    </group>
  );
};
