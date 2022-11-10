import { getPart } from 'core/part';
import { memo, useEffect, useRef } from 'react';
import useBlueprint from 'stores/blueprint';
import boundsStore from 'stores/bounds';
import {
  BufferGeometry,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Vector2,
  Vector2Tuple,
} from 'three';

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
/**
 * @deprecated Use `UNIT_POINTS` instead
 */
export const unitBufferGeometry2 = new BufferGeometry().setFromPoints(
  unitVector2Points,
);
export const outlineMaterial = new LineBasicMaterial({
  color: SELECTION_BOX_COLOR,
});
const shadingMaterial = new MeshBasicMaterial({
  color: SELECTION_BOX_COLOR,
  transparent: true,
  opacity: 0.25,
});

export interface PartBoundProps {
  id: string;
}

export const PartBound = memo<PartBoundProps>(
  ({ id }) => {
    const outline = useRef<Line>(null);
    const shading = useRef<Mesh>(null);
    const wrapper = useRef<Group>(null);

    const resize = () => {
      if (boundsStore[id]) {
        const { bounds } = boundsStore[id];
        wrapper.current?.position.set(bounds.x, bounds.y, 0);
        wrapper.current?.rotation.set(0, 0, bounds.rotation);
        outline.current?.position.set(bounds.width / -2, bounds.height / -2, 0);
        outline.current?.scale.set(bounds.width, bounds.height, 1);
        shading.current?.scale.set(bounds.width, bounds.height, 1);
      }
    };

    useEffect(() => {
      resize();

      useBlueprint.subscribe(
        (state) => getPart(id, state)?.selected,
        (selected = false) => {
          if (wrapper.current) wrapper.current.visible = selected;
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
        <line_
          ref={outline}
          material={outlineMaterial}
          geometry={unitBufferGeometry2}
        />
        <mesh ref={shading} material={shadingMaterial} geometry={unitPlane} />
      </group>
    );
  },
  ({ id: prevId }, { id: nextId }) => prevId === nextId,
);
