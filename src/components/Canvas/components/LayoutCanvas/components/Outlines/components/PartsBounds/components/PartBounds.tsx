import { Line } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { getPart } from 'core/part';
import { memo, useEffect, useRef } from 'react';
import useBlueprint from 'stores/blueprint';
import boundsStore from 'stores/bounds';
import {
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Vector2,
  Vector2Tuple,
} from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';

export const UNIT_POINTS: Vector2Tuple[] = [
  [-0.5, 0.5],
  [0.5, 0.5],
  [0.5, -0.5],
  [-0.5, -0.5],
  [-0.5, 0.5],
];

/**
 * @deprecated Use `UNIT_POINTS` instead
 */
const unitVector2Points = [
  new Vector2(0, 0),
  new Vector2(1, 0),
  new Vector2(1, 1),
  new Vector2(0, 1),
  new Vector2(0, 0),
];
const unitPlane = new PlaneGeometry(1, 1);
const SELECTION_BOX_COLOR = 'hsl(270, 60%, 30%)';
const shadingMaterial = new MeshBasicMaterial({
  color: SELECTION_BOX_COLOR,
  transparent: true,
  opacity: 0.25,
});

export interface PartBoundProps {
  id: string;
}

export const PartBounds = memo<PartBoundProps>(
  ({ id }) => {
    const outline = useRef<Line2>(null);
    const shading = useRef<Mesh>(null);
    const wrapper = useRef<Group>(null);
    const invalidate = useThree((state) => state.invalidate);

    const resize = () => {
      if (boundsStore[id]) {
        const { bounds } = boundsStore[id];
        wrapper.current?.position.set(bounds.x, bounds.y, 0);
        wrapper.current?.rotation.set(0, 0, bounds.rotation);
        wrapper.current?.scale.set(bounds.width, bounds.height, 1);
      }
    };

    useEffect(() => {
      resize();

      useBlueprint.subscribe(
        (state) => getPart(id, state)?.selected,
        (selected = false) => {
          if (wrapper.current) {
            wrapper.current.visible = selected;
            invalidate();
          }
        },
      );

      const handleUpdateBounds = resize;

      window.addEventListener(
        `updatebounds${id}`,
        handleUpdateBounds as EventListener,
      );

      return () => {
        window.removeEventListener(
          `updatebounds${id}`,
          handleUpdateBounds as EventListener,
        );
      };
    });

    return (
      <group ref={wrapper} visible={getPart(id)?.selected}>
        <Line
          ref={outline}
          color={'#9d5bd2'}
          points={UNIT_POINTS}
          lineWidth={2}
        />
        <mesh ref={shading} material={shadingMaterial} geometry={unitPlane} />
      </group>
    );
  },
  ({ id: prevId }, { id: nextId }) => prevId === nextId,
);
