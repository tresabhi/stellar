import { Line } from '@react-three/drei';
import { invalidate, ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { resizePartAsync } from 'core/part/resizePartAsync';
import { PartWithPosition } from 'game/parts/PartWithPosition';
import { PartWithScale } from 'game/parts/PartWithScale';
import { FC, MutableRefObject, useEffect, useRef } from 'react';
import useBlueprint from 'stores/blueprint';
import { Bounds } from 'stores/bounds';
import { Group, LineBasicMaterial, Vector2, Vector2Tuple } from 'three';
import { UNIT_POINTS } from '../../PartsBounds/components/PartBounds';

export interface ResizeNodeProps {
  bounds: MutableRefObject<Bounds>;
  constant: Vector2Tuple;
  movable: Vector2Tuple;
  maintainSlope?: boolean;
}

export const CANVAS_MATRIX_SCALE = new Vector2(1, -1);
const SNAP_SIZE = 1 / 5; // TODO: unify all these snaps

export const sideToPoint = (
  bounds: Bounds,
  side: Vector2Tuple,
): Vector2Tuple => {
  const offsetXOriginal = bounds.width * (side[0] / 2);
  const offsetYOriginal = bounds.height * (side[1] / 2);
  const hypotenuse = Math.hypot(offsetXOriginal, offsetYOriginal);
  const rotationOriginal = Math.atan2(offsetYOriginal, offsetXOriginal);
  const rotation = rotationOriginal + bounds.rotation;
  const offsetX = hypotenuse * Math.cos(rotation);
  const offsetY = hypotenuse * Math.sin(rotation);
  const x = bounds.x + offsetX;
  const y = bounds.y + offsetY;

  return [x, y];
};

const NODE_SIZE = 10;
const NODE_COLOR = '#eeedef';

export const borderMaterial = new LineBasicMaterial({
  color: '#8f8f8f',
});

export const ResizeNode: FC<ResizeNodeProps> = ({
  bounds,
  constant: constantSide,
  movable: movableSide,
  maintainSlope = false,
  // maintainSlope = true,
}) => {
  const camera = useThree((state) => state.camera);
  const wrapper = useRef<Group>(null);
  const constant = new Vector2();
  const movable = new Vector2();
  const movedMovable = new Vector2();
  const size = new Vector2();
  const scaledSize = new Vector2();
  const scale = new Vector2();
  const initial = new Vector2();
  const offset = new Vector2();
  let blueprint = useBlueprint.getState();
  let selections: string[] = [];
  // let cache: Record<string, { position: Vector2Tuple }> = {};

  const handleUpdateResizeNodes = () => {
    constant.set(...sideToPoint(bounds.current, constantSide));
    movable.set(...sideToPoint(bounds.current, movableSide));
    movedMovable.copy(movable);
    size.copy(movable).sub(constant);
    scaledSize.copy(size);
    scale.set(1, 1);

    wrapper.current?.position.set(...movedMovable.toArray(), 2);
    wrapper.current?.rotation.set(0, 0, bounds.current.rotation);
  };
  handleUpdateResizeNodes();

  useFrame(({ camera }) => {
    const scale = (1 / camera.zoom) * NODE_SIZE;
    wrapper.current?.scale.set(scale, scale, scale);
  });
  useEffect(() => {
    window.addEventListener('updateresizenodes', handleUpdateResizeNodes);

    return () => {
      window.removeEventListener('updateresizenodes', handleUpdateResizeNodes);
    };
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    initial.set(event.clientX, event.clientY);
    movedMovable.copy(movable);

    blueprint = useBlueprint.getState();
    selections = blueprint.selections.filter((selection) => {
      const part = blueprint.parts[selection];

      return (
        (part as PartWithPosition).p !== undefined &&
        (part as PartWithScale).o !== undefined
      );
    });

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };
  const handlePointerMove = (event: PointerEvent) => {
    offset
      .set(event.clientX, event.clientY)
      .sub(initial)
      .multiply(CANVAS_MATRIX_SCALE)
      .divideScalar(camera.zoom)
      .divideScalar(SNAP_SIZE)
      .round()
      .multiplyScalar(SNAP_SIZE);
    movedMovable.copy(movable).add(offset);
    const pointerX = movable.x + offset.x;
    const pointerY = movable.y + offset.y;

    if (maintainSlope) {
      const slope = (movable.y - constant.y) / (movable.x - constant.x);
      const perpendicular = -1 / slope;

      const movedX = isFinite(slope)
        ? isFinite(perpendicular)
          ? (-constant.x * slope +
              pointerX * perpendicular +
              constant.y -
              pointerY) /
            (perpendicular - slope)
          : pointerX
        : constant.x;
      const movedY = isFinite(slope)
        ? isFinite(perpendicular)
          ? (-constant.x * perpendicular * slope +
              pointerX * perpendicular * slope +
              constant.y * perpendicular -
              pointerY * slope) /
            (perpendicular - slope)
          : constant.y
        : pointerY;

      wrapper.current?.position.set(movedX, movedY, wrapper.current.position.z);
    } else {
      wrapper.current?.position.set(
        pointerX,
        pointerY,
        wrapper.current.position.z,
      );
    }

    scaledSize.copy(movedMovable).sub(constant);
    scale.copy(scaledSize).divide(size);

    selections.forEach((selection) => {
      resizePartAsync(selection, [constant.x, constant.y], [scale.x, scale.y]);
    });

    invalidate();
  };
  const handlePointerUp = () => {
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  };

  return (
    <group ref={wrapper} onPointerDown={handlePointerDown}>
      <mesh>
        <planeGeometry />
        <meshBasicMaterial color={NODE_COLOR} />
      </mesh>

      <Line
        position={[0, 0, 2]}
        color={'#8f8f8f'}
        points={UNIT_POINTS}
        lineWidth={2}
      />
    </group>
  );
};
