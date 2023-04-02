import { Line } from '@react-three/drei';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import ControlNode from 'components/ControlNode';
import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import deferUpdates from 'core/bounds/deferUpdates';
import getBoundsFromParts from 'core/bounds/getBoundsFromParts';
import declareInteractingWithPart from 'core/interface/declareInteractingWithPart';
import getPart from 'core/part/getPart';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import useMousePosition from 'hooks/useMousePosition';
import { useRef } from 'react';
import useApp from 'stores/app';
import { Group, Vector2, Vector2Tuple } from 'three';
import { Line2 } from 'three-stdlib';

export interface PartRotateEventDetail {
  rotation: number;
  center: Vector2Tuple;
}

export interface RotateNodeProps {
  bounds: ReturnType<typeof getBoundsFromParts>;
  selections: string[];
}

export const ROTATION_SNAP_SIZE = Math.PI / 12;
const CONNECTION_LENGTH = 25;

export default function RotateNode({
  bounds: { bounds },
  selections,
}: RotateNodeProps) {
  const node = useRef<Group>(null);
  const connection = useRef<Line2>(null);
  const center = new Vector2(bounds.x, bounds.y);
  const position = new Vector2();
  let initialRotation = 0;
  let offset = 0;
  let lastOffset = 0;
  const getMousePosition = useMousePosition();
  let firstMove = true;

  useFrame(({ camera }) => {
    node.current?.position.set(
      0,
      bounds.height / 2 + CONNECTION_LENGTH / camera.zoom,
      0,
    );
    connection.current?.position.set(
      0,
      bounds.height / 2 + CONNECTION_LENGTH / 2 / camera.zoom,
      0,
    );
    connection.current?.scale.set(1, CONNECTION_LENGTH / camera.zoom, 1);
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    initialRotation = position
      .set(...getMousePosition(event))
      .sub(center)
      .angle();
    offset = 0;
    lastOffset = offset;
    firstMove = true;

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    window.addEventListener('pointermove', handlePointerMove);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    window.addEventListener('pointerup', handlePointerUp);
  };
  const handlePointerMove = (event: PointerEvent) => {
    const { snap } = useApp.getState().editor;

    if (firstMove) {
      firstMove = false;
      deferUpdates();
      declareInteractingWithPart();
    }

    offset =
      position
        .set(...getMousePosition(event))
        .sub(center)
        .angle() - initialRotation;

    if (!(event.ctrlKey || !snap)) {
      offset = Math.round(offset / ROTATION_SNAP_SIZE) * ROTATION_SNAP_SIZE;
    }

    if (offset !== lastOffset) {
      lastOffset = offset;

      window.dispatchEvent(
        new CustomEvent<PartRotateEventDetail>('partrotate', {
          detail: { rotation: offset, center: center.toArray() },
        }),
      );
    }
  };
  const handlePointerUp = () => {
    const partPosition = new Vector2();

    if (!firstMove) {
      deferUpdates(false);
      declareInteractingWithPart(false);
    }

    mutateBlueprint((draft) => {
      selections.forEach((selection) => {
        const { p, o } = getPart<PartWithTransformations>(selection, draft);

        partPosition.set(p.x, p.y).rotateAround(center, offset);

        p.x = partPosition.x;
        p.y = partPosition.y;
        o.z += offset * (180 / Math.PI);
      });
    });

    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  };

  return (
    <>
      <ControlNode ref={node} circle onPointerDown={handlePointerDown} />
      <Line
        ref={connection}
        points={[
          [0, -0.5],
          [0, 0.5],
        ]}
        color="#8f8f8f"
        lineWidth={2}
      />
    </>
  );
}
