import { ThreeEvent, useThree } from '@react-three/fiber';
import ControlNode from 'components/ControlNode';
import deferUpdates from 'core/bounds/deferUpdates';
import { DeferUpdatesEventDetail } from 'core/bounds/getDeferUpdates';
import mutateParts from 'core/part/mutateParts';
import shouldSnap from 'core/part/shouldSnap';
import { BOTTOM_WIDTH, Base } from 'game/parts/Base';
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

export interface BaseEditDetail {
  width: number;
  height: number;
  extra: number;
}

export const ORIGIN = new Vector2();

export default function BaseControls({ id }: EditControlsProps) {
  const part = usePart<Base>(id);
  const wrapper = useRef<Group>(null);
  const camera = useThree((state) => state.camera);
  const topControl = useRef<Group>(null);
  const bottomControl = useRef<Group>(null);
  const initial = new Vector2();
  const offset = new Vector2();
  const lastOffset = new Vector2();
  const scale = new Vector2(part.o.x, part.o.y);
  let firstMove = true;

  useEffect(() => {
    wrapper.current?.position.set(part.p.x, part.p.y, 2);
    wrapper.current?.rotation.set(0, 0, degToRad(part.o.z));
    topControl.current?.position.set(
      (part.N.width * part.o.x) / 2,
      part.N.height * part.o.y,
      0,
    );
    bottomControl.current?.position.set(
      (part.o.x * (part.N.width + part.N.width * BOTTOM_WIDTH + part.N.extra)) /
        2,
      0,
      0,
    );

    const handleDeferUpdates = (
      event: CustomEvent<DeferUpdatesEventDetail>,
    ) => {
      if (
        topControl.current &&
        bottomControl.current &&
        useApp.getState().editor.tool === Tool.Edit
      ) {
        topControl.current.visible = !event.detail;
        bottomControl.current.visible = !event.detail;
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

    offset.x = Math.max(offset.x, -part.N.width);
    offset.y = Math.max(offset.y, -part.N.height);

    if (!offset.equals(lastOffset)) {
      window.dispatchEvent(
        new CustomEvent<BaseEditDetail>(`baseedit${id}`, {
          detail: {
            width: part.N.width + offset.x,
            height: part.N.height + offset.y,
            extra: part.N.extra,
          },
        }),
      );
    }
  };
  const handleTopPointerUp = () => {
    if (!firstMove) deferUpdates(false);

    mutateParts<Base>(id, (draft) => {
      draft.N.width = part.N.width + offset.x;
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
        new CustomEvent<BaseEditDetail>(`baseedit${id}`, {
          detail: {
            width: part.N.width,
            height: part.N.height,
            extra: part.N.extra + offset.x,
          },
        }),
      );
    }
  };
  const handleBottomPointerUp = () => {
    if (!firstMove) deferUpdates(false);

    mutateParts<Base>(id, (draft) => {
      draft.N.extra = part.N.extra + offset.x;
    });

    window.removeEventListener('pointermove', handleBottomPointerMove);
    window.removeEventListener('pointerup', handleBottomPointerUp);
  };

  return (
    <group ref={wrapper}>
      <ControlNode
        ref={topControl}
        rotation={[0, 0, Math.PI / 4]}
        colorInner="#fcba03"
        colorOuter="#c49000"
        onPointerDown={handleTopPointerDown}
      />
      <ControlNode
        ref={bottomControl}
        scale={[1, 2, 1]}
        colorInner="#fcba03"
        colorOuter="#c49000"
        onPointerDown={handleBottomPointerDown}
      />
    </group>
  );
}
