import { ThreeEvent, useThree } from '@react-three/fiber';
import ControlNode from 'components/ControlNode';
import deferUpdates from 'core/bounds/deferUpdates';
import { DeferUpdatesEventDetail } from 'core/bounds/getDeferUpdates';
import mutateParts from 'core/part/mutateParts';
import shouldSnap from 'core/part/shouldSnap';
import { FuelTank } from 'game/parts/FuelTank';
import usePart from 'hooks/usePart';
import { useEffect, useRef } from 'react';
import useApp, { Tool } from 'stores/app';
import { Group, Vector2 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import { EditControlsProps } from '../..';
import {
  CANVAS_MATRIX_SCALE,
  POSITION_SNAP_SIZE,
} from '../../../TransformControls/components/TransformNode';

export interface FuelTankEditDetail {
  width_a: number;
  width_b: number;
  height: number;
}

export const ORIGIN = new Vector2();

/**
 * I know there is unnecessary code here for the bottom width since we are only
 * manipulating the bottom width on the x-axis; but I'll keep the vectors
 * anyway just in case I wanna make it mutable on the y-axis too.
 */

const FUEL_TANK_TOP_EDGE_MATRIX_SCALE = new Vector2(2, 1);
const FUEL_TANK_BOTTOM_EDGE_MATRIX_SCALE = new Vector2(2, 0);

export default function FuelTankControls({ id }: EditControlsProps) {
  const part = usePart<FuelTank>(id);
  const wrapper = useRef<Group>(null);
  const camera = useThree((state) => state.camera);
  const top = useRef<Group>(null);
  const bottom = useRef<Group>(null);
  const initial = new Vector2();
  const offset = new Vector2();
  const lastOffset = new Vector2();
  const scale = new Vector2(part.o.x, part.o.y);
  let firstMove = true;

  useEffect(() => {
    wrapper.current?.position.set(part.p.x, part.p.y, 2);
    wrapper.current?.rotation.set(0, 0, degToRad(part.o.z));
    top.current?.position.set(
      (part.N.width_b * part.o.x) / 2,
      part.N.height * part.o.y,
      0,
    );
    bottom.current?.position.set((part.N.width_a * part.o.x) / 2, 0, 0);

    const handleDeferUpdates = (
      event: CustomEvent<DeferUpdatesEventDetail>,
    ) => {
      if (
        top.current &&
        bottom.current &&
        useApp.getState().editor.tool === Tool.Edit
      ) {
        top.current.visible = !event.detail;
        bottom.current.visible = !event.detail;
      }
    };

    window.addEventListener(
      'deferupdates',
      handleDeferUpdates as EventListener,
    );

    return () => {
      window.removeEventListener(
        'deferupdates',
        handleDeferUpdates as EventListener,
      );
    };
  });

  const handleTopPointerDown = (event: ThreeEvent<PointerEvent>) => {
    initial.set(event.nativeEvent.clientX, event.nativeEvent.clientY);
    lastOffset.set(0, 0);

    firstMove = true;

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    window.addEventListener('pointermove', handleTopPointerMove);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    window.addEventListener('pointerup', handleTopPointerUp);
  };
  const handleTopPointerMove = (event: PointerEvent) => {
    if (firstMove) {
      firstMove = false;
      deferUpdates();
    }

    offset
      .set(event.clientX, event.clientY)
      .sub(initial)
      .rotateAround(ORIGIN, degToRad(part.o.z))
      .divideScalar(camera.zoom)
      .divide(scale)
      .multiply(CANVAS_MATRIX_SCALE)
      .multiply(FUEL_TANK_TOP_EDGE_MATRIX_SCALE);

    if (shouldSnap(event)) {
      offset
        .divideScalar(POSITION_SNAP_SIZE)
        .round()
        .multiplyScalar(POSITION_SNAP_SIZE);
    }

    offset.x = Math.max(offset.x, -part.N.width_b);
    offset.y = Math.max(offset.y, -part.N.height);

    if (!offset.equals(lastOffset)) {
      window.dispatchEvent(
        new CustomEvent<FuelTankEditDetail>(`fueltankedit${id}`, {
          detail: {
            width_a: part.N.width_a,
            width_b: part.N.width_b + offset.x,
            height: part.N.height + offset.y,
          },
        }),
      );
    }
  };
  const handleTopPointerUp = () => {
    if (!firstMove) deferUpdates(false);

    mutateParts<FuelTank>(id, (draft) => {
      draft.N.width_b = part.N.width_b + offset.x;
      draft.N.width_original = part.N.width_b;
      draft.N.height = part.N.height + offset.y;
    });

    window.removeEventListener('pointermove', handleTopPointerMove);
    window.removeEventListener('pointerup', handleTopPointerUp);
  };
  const handleBottomPointerDown = (event: ThreeEvent<PointerEvent>) => {
    initial.set(event.nativeEvent.clientX, event.nativeEvent.clientY);
    lastOffset.set(0, 0);

    firstMove = true;

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    window.addEventListener('pointermove', handleBottomPointerMove);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    window.addEventListener('pointerup', handleBottomPointerUp);
  };
  const handleBottomPointerMove = (event: PointerEvent) => {
    if (firstMove) {
      firstMove = false;
      deferUpdates();
    }

    offset
      .set(event.clientX, event.clientY)
      .sub(initial)
      .rotateAround(ORIGIN, degToRad(part.o.z))
      .divideScalar(camera.zoom)
      .divide(scale)
      .multiply(CANVAS_MATRIX_SCALE)
      .multiply(FUEL_TANK_BOTTOM_EDGE_MATRIX_SCALE);

    if (shouldSnap(event)) {
      offset
        .divideScalar(POSITION_SNAP_SIZE)
        .round()
        .multiplyScalar(POSITION_SNAP_SIZE);
    }

    offset.x = Math.max(offset.x, -part.N.width_a);
    offset.y = Math.max(offset.y, -part.N.height);

    if (!offset.equals(lastOffset)) {
      window.dispatchEvent(
        new CustomEvent<FuelTankEditDetail>(`fueltankedit${id}`, {
          detail: {
            width_a: part.N.width_a + offset.x,
            width_b: part.N.width_b,
            height: part.N.height + offset.y,
          },
        }),
      );
    }
  };
  const handleBottomPointerUp = () => {
    if (!firstMove) deferUpdates(false);

    mutateParts<FuelTank>(id, (draft) => {
      draft.N.width_a = part.N.width_a + offset.x;
      draft.N.height = part.N.height + offset.y;
    });

    window.removeEventListener('pointermove', handleBottomPointerMove);
    window.removeEventListener('pointerup', handleBottomPointerUp);
  };

  return (
    <group ref={wrapper}>
      <ControlNode
        ref={top}
        rotation={[0, 0, Math.PI / 4]}
        colorInner="#fcba03"
        colorOuter="#c49000"
        onPointerDown={handleTopPointerDown}
      />
      <ControlNode
        ref={bottom}
        scale={[1, 2, 1]}
        colorInner="#fcba03"
        colorOuter="#c49000"
        onPointerDown={handleBottomPointerDown}
      />
    </group>
  );
}
