import { Line } from '@react-three/drei';
import { invalidate } from '@react-three/fiber';
import getBoundsFromParts, {
  emptyBounds,
} from 'core/bounds/getBoundsFromParts';
import { DeferUpdatesEventDetail } from 'core/bounds/getDeferUpdates';
import filter from 'core/part/filter';
import getChildrenRecursive from 'core/part/getChildrenRecursive';
import { useEffect, useRef, useState } from 'react';
import useApp, { Tool } from 'stores/app';
import useBlueprint from 'stores/blueprint';
import { Group } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';
import { UNIT_POINTS } from '../PartsBounds/components/PartBounds';
import RotateNode from './components/RotateNode';
import TransformNode from './components/TransformNode';

export default function TransformControls() {
  const selections = useBlueprint((state) => state.part_selections);
  const isToolTransform = useApp(
    (state) => state.editor.tool === Tool.Transform,
  );
  const visible = selections.length > 0 && isToolTransform;
  const mutableSelections = filter(
    getChildrenRecursive(selections),
    ({ locked }) => !locked,
  );
  const wrapper = useRef<Group>(null);
  const outline = useRef<Line2>(null);
  const [{ bounds, hasMutualAngle }, setBounds] = useState<
    ReturnType<typeof getBoundsFromParts>
  >({
    hasMutualAngle: false,
    bounds: emptyBounds,
  });

  useEffect(() => {
    const calculateBounds = fallingEdgeDebounce(() => {
      if (visible) setBounds(getBoundsFromParts(selections));
    }, 0);
    const handleDeferUpdates = (
      event: CustomEvent<DeferUpdatesEventDetail>,
    ) => {
      if (wrapper.current) wrapper.current.visible = !event.detail;
    };

    calculateBounds();

    const unsubscribeTool = useApp.subscribe(
      (state) => state.editor.tool,
      (tool) => {
        if (wrapper.current) wrapper.current.visible = tool === Tool.Transform;
        invalidate();
      },
    );
    window.addEventListener(
      'deferupdates',
      handleDeferUpdates as EventListener,
    );
    selections.forEach((selection) => {
      window.addEventListener(`boundsupdated${selection}`, calculateBounds);
    });

    return () => {
      unsubscribeTool();
      selections.forEach((selection) => {
        window.removeEventListener(
          `boundsupdated${selection}`,
          calculateBounds,
        );
      });
      window.removeEventListener(
        'deferupdates',
        handleDeferUpdates as EventListener,
      );
    };
  }, [selections, visible]);

  return visible ? (
    <group
      ref={wrapper}
      position={[bounds.x, bounds.y, 0]}
      rotation={[0, 0, bounds.rotation]}
    >
      <RotateNode
        bounds={{ bounds, hasMutualAngle }}
        selections={mutableSelections}
      />

      <Line
        ref={outline}
        scale={[bounds.width, bounds.height, 1]}
        lineWidth={2}
        color="#9d5bd2"
        points={UNIT_POINTS}
      />

      <TransformNode // top left
        bounds={{ bounds, hasMutualAngle }}
        position={[-1, 1]}
        selections={mutableSelections}
      />
      <TransformNode // top
        bounds={{ bounds, hasMutualAngle }}
        position={[0, 1]}
        selections={mutableSelections}
      />
      <TransformNode // top right
        bounds={{ bounds, hasMutualAngle }}
        position={[1, 1]}
        selections={mutableSelections}
      />
      <TransformNode // right
        bounds={{ bounds, hasMutualAngle }}
        position={[1, 0]}
        selections={mutableSelections}
      />
      <TransformNode // bottom right
        bounds={{ bounds, hasMutualAngle }}
        position={[1, -1]}
        selections={mutableSelections}
      />
      <TransformNode // bottom
        bounds={{ bounds, hasMutualAngle }}
        position={[0, -1]}
        selections={mutableSelections}
      />
      <TransformNode // bottom left
        bounds={{ bounds, hasMutualAngle }}
        position={[-1, -1]}
        selections={mutableSelections}
      />
      <TransformNode // left
        bounds={{ bounds, hasMutualAngle }}
        position={[-1, 0]}
        selections={mutableSelections}
      />
    </group>
  ) : null;
}
