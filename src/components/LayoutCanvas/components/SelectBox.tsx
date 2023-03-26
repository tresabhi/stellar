import { Line } from '@react-three/drei';
import { invalidate, useThree } from '@react-three/fiber';
import select from 'core/part/select';
import selectConcurrent from 'core/part/selectConcurrent';
import useMousePosition from 'hooks/useMousePosition';
import { useEffect, useRef } from 'react';
import useApp, { Tool } from 'stores/app';
import useBlueprint from 'stores/blueprint';
import boundsStore from 'stores/bounds';
import useSettings from 'stores/settings';
import { Vector2Tuple } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { UNIT_POINTS } from './PartsBounds/components/PartBounds';

export default function SelectBox() {
  const canvas = useThree((state) => state.gl.domElement);
  const getMousePosition = useMousePosition();
  const outline = useRef<Line2>(null);

  useEffect(() => {
    let firstMove = true;
    let initialPosition: Vector2Tuple = [0, 0];
    let currentPosition: Vector2Tuple = [0, 0];
    let bottomLeft: Vector2Tuple = [0, 0];
    let topRight: Vector2Tuple = [0, 0];

    const handlePointerDown = (event: PointerEvent) => {
      const {
        tool,
        isSpacePanning,
        isInteractingWithPart: isDraggingPart,
      } = useApp.getState().editor;

      if (tool === Tool.Transform && !isSpacePanning && !isDraggingPart) {
        firstMove = true;
        initialPosition = getMousePosition(event);
        currentPosition = initialPosition;
        bottomLeft = initialPosition;
        topRight = initialPosition;

        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        window.addEventListener('pointermove', handlePointerMove);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        window.addEventListener('pointerup', handlePointerUp);
      }
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (firstMove && outline.current) outline.current.visible = true;
      firstMove = false;
      currentPosition = getMousePosition(event);
      bottomLeft = [
        Math.min(initialPosition[0], currentPosition[0]),
        Math.min(initialPosition[1], currentPosition[1]),
      ];
      topRight = [
        Math.max(initialPosition[0], currentPosition[0]),
        Math.max(initialPosition[1], currentPosition[1]),
      ];

      outline.current?.position.set(
        (bottomLeft[0] + topRight[0]) / 2,
        (bottomLeft[1] + topRight[1]) / 2,
        3,
      );
      outline.current?.scale.set(
        topRight[0] - bottomLeft[0],
        topRight[1] - bottomLeft[1],
        1,
      );
      invalidate();
    };
    const handlePointerUp = (event: PointerEvent) => {
      if (outline.current) outline.current.visible = false;
      const { parts } = useBlueprint.getState();
      const { selectMultiple, selectDeep } = useSettings.getState().editor;

      const selected: string[] = [];
      Object.keys(boundsStore).forEach((id) => {
        const { bounds } = boundsStore[id];
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { parent_id } = parts[id];

        if (
          (event.ctrlKey || (selectDeep ? true : parent_id == null)) &&
          bounds.x >= bottomLeft[0] &&
          bounds.x <= topRight[0] &&
          bounds.y >= bottomLeft[1] &&
          bounds.y <= topRight[1]
        ) {
          selected.push(id);
        }
      });

      if (selected.length > 1) {
        if (event.shiftKey || selectMultiple) {
          select(selected);
        } else {
          selectConcurrent(selected);
        }
      }
      invalidate();

      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    const unsubscribeIsDraggingPart = useApp.subscribe(
      (state) => state.editor.isInteractingWithPart,
      (isDraggingPart) => {
        if (isDraggingPart) {
          if (outline.current) outline.current.visible = false;
          window.removeEventListener('pointermove', handlePointerMove);
          window.removeEventListener('pointerup', handlePointerUp);
        }
      },
    );

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      unsubscribeIsDraggingPart();
    };
  }, [canvas, getMousePosition]);

  return (
    <Line
      ref={outline}
      color="#a991bd"
      points={UNIT_POINTS}
      scale={0}
      lineWidth={2}
    />
  );
}
