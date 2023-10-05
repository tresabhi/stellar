import { ThreeEvent, useThree } from '@react-three/fiber';
import ControlNode from 'components/ControlNode';
import deferUpdates from 'core/bounds/deferUpdates';
import { DeferUpdatesEventDetail } from 'core/bounds/getDeferUpdates';
import mutateParts from 'core/part/mutateParts';
import shouldSnap from 'core/part/shouldSnap';
import { BaseSmall } from 'game/parts/BaseSmall';
import usePart from 'hooks/usePart';
import { useEffect, useRef } from 'react';
import useApp, { Tool } from 'stores/app';
import { Group, Vector2 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import { EditControlsProps } from '..';
import {
  CANVAS_MATRIX_SCALE,
  POSITION_SNAP_SIZE,
} from '../../TransformControls/components/TransformNode';
import { FUEL_TANK_TOP_EDGE_MATRIX_SCALE } from './FuelTankControls';

export interface BaseSmallEditDetail {
  width: number;
  height: number;
}

export const ORIGIN = new Vector2();

export default function BaseSmallControls({ id }: EditControlsProps) {
  const part = usePart<BaseSmall>(id);
  const wrapper = useRef<Group>(null);
  const camera = useThree((state) => state.camera);
  const control = useRef<Group>(null);
  const initial = new Vector2();
  const offset = new Vector2();
  const lastOffset = new Vector2();
  const scale = new Vector2(part.o.x, part.o.y);
  let firstMove = true;

  useEffect(() => {
    wrapper.current?.position.set(part.p.x, part.p.y, 2);
    wrapper.current?.rotation.set(0, 0, degToRad(part.o.z));
    control.current?.position.set(
      (part.N.width * part.o.x) / 2,
      part.N.height * part.o.y,
      0,
    );

    const handleDeferUpdates = (
      event: CustomEvent<DeferUpdatesEventDetail>,
    ) => {
      if (control.current && useApp.getState().editor.tool === Tool.Edit) {
        control.current.visible = !event.detail;
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

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    initial.set(event.nativeEvent.clientX, event.nativeEvent.clientY);
    lastOffset.set(0, 0);

    firstMove = true;

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    window.addEventListener('pointermove', handlePointerMove);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    window.addEventListener('pointerup', handlePointerUp);
  };
  const handlePointerMove = (event: PointerEvent) => {
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

    offset.x = Math.max(offset.x, -part.N.width);
    offset.y = Math.max(offset.y, -part.N.height);

    if (!offset.equals(lastOffset)) {
      window.dispatchEvent(
        new CustomEvent<BaseSmallEditDetail>(`basesmalledit${id}`, {
          detail: {
            width: part.N.width + offset.x,
            height: part.N.height + offset.y,
          },
        }),
      );
    }
  };
  const handlePointerUp = () => {
    if (!firstMove) deferUpdates(false);

    mutateParts<BaseSmall>(id, (draft) => {
      draft.N.width = part.N.width + offset.x;
      draft.N.height = part.N.height + offset.y;
    });

    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  };

  return (
    <group ref={wrapper}>
      <ControlNode
        ref={control}
        rotation={[0, 0, Math.PI / 4]}
        colorInner="#fcba03"
        colorOuter="#c49000"
        onPointerDown={handlePointerDown}
      />
    </group>
  );
}
