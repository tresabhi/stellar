import { Line } from '@react-three/drei';
import { invalidate } from '@react-three/fiber';
import getBoundsFromParts from 'core/bounds/getBoundsFromParts';
import { DeferUpdatesEventDetail } from 'core/bounds/getDeferUpdates';
import { useEffect, useRef } from 'react';
import useApp, { Tool } from 'stores/app';
import useBlueprint from 'stores/blueprint';
import { Bounds } from 'stores/bounds';
import { Group } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';
import { UNIT_POINTS } from '../PartsBounds/components/PartBounds';
import TransformNode from './components/TransformNode';

export interface UpdateTransformNodesDetail {
  maintainSlope: boolean;
}

export default function TransformControls() {
  const tool = useApp((state) => state.editor.tool);
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
    const boundsFromParts = getBoundsFromParts(selections);

    bounds.current = boundsFromParts.bounds;

    outline.current?.position.set(bounds.current.x, bounds.current.y, 0);
    outline.current?.rotation.set(0, 0, bounds.current.rotation);
    outline.current?.scale.set(bounds.current.width, bounds.current.height, 1);

    window.dispatchEvent(
      new CustomEvent<UpdateTransformNodesDetail>('updatetransformnodes', {
        detail: { maintainSlope: !boundsFromParts.hasMutualAngle },
      }),
    );
    invalidate();
  };
  const debouncedRecalculateBounds = fallingEdgeDebounce(recalculateBounds, 0);

  useEffect(() => {
    const handleDeferUpdates = (
      event: CustomEvent<DeferUpdatesEventDetail>,
    ) => {
      if (wrapper.current && useApp.getState().editor.tool === Tool.Transform) {
        wrapper.current.visible = !event.detail;
      }
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
    <group
      ref={wrapper}
      visible={selections.length > 0 && tool === Tool.Transform}
    >
      <Line ref={outline} lineWidth={2} color="#9d5bd2" points={UNIT_POINTS} />

      <TransformNode // top left
        bounds={bounds}
        constant={[1, -1]}
        movable={[-1, 1]}
      />
      <TransformNode // top
        bounds={bounds}
        constant={[0, -1]}
        movable={[0, 1]}
        hideOnMaintainSlope
      />
      <TransformNode // top right
        bounds={bounds}
        constant={[-1, -1]}
        movable={[1, 1]}
      />
      <TransformNode // right
        bounds={bounds}
        constant={[-1, 0]}
        movable={[1, 0]}
        hideOnMaintainSlope
      />
      <TransformNode // bottom right
        bounds={bounds}
        constant={[-1, 1]}
        movable={[1, -1]}
      />
      <TransformNode // bottom
        bounds={bounds}
        constant={[0, 1]}
        movable={[0, -1]}
        hideOnMaintainSlope
      />
      <TransformNode // bottom left
        bounds={bounds}
        constant={[1, 1]}
        movable={[-1, -1]}
      />
      <TransformNode // left
        bounds={bounds}
        constant={[1, 0]}
        movable={[-1, 0]}
        hideOnMaintainSlope
      />
    </group>
  );
}
