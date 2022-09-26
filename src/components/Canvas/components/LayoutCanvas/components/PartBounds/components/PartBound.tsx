import { FC, useEffect, useRef } from 'react';
import useBounds, { PartBounds } from 'stores/useBounds';
import {
  BufferGeometry,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Vector2,
} from 'three';

const unitVector2Points = [
  new Vector2(0, 0),
  new Vector2(1, 0),
  new Vector2(1, 1),
  new Vector2(0, 1),
  new Vector2(0, 0),
];
const unitPlane = new PlaneGeometry(1, 1);
const SELECTION_BOX_COLOR = 'hsl(270, 60%, 30%)';
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

export const PartBound: FC<PartBoundProps> = ({ id }) => {
  const outline = useRef<Line>(null);
  const shading = useRef<Mesh>(null);
  const wrapper = useRef<Group>(null);
  const { deferUpdates } = useBounds();

  const rerender = (bound: PartBounds) => {
    shading.current?.scale.set(bound.width, bound.height, 1);
    outline.current?.scale.set(bound.width, bound.height, 1);
    outline.current?.position.set(bound.width / -2, bound.height / -2, 0);
    wrapper.current?.rotation.set(0, 0, bound.rotation);
    wrapper.current?.position.set(bound.position.x, bound.position.y, 0);
  };

  useEffect(() => {
    const bounds = useBounds.getState().parts.get(id)?.bounds;

    if (bounds) rerender(bounds);
  });
  useEffect(() => {
    const unsubscribeBoundListing = useBounds.subscribe(
      (state) => state.parts.get(id),
      (boundListing) => {
        if (boundListing) rerender(boundListing.bounds);
      },
    );
    const unsubscribeDeferUpdates = useBounds.subscribe(
      (state) => state.deferUpdates,
      (deferUpdates) => {
        if (shading.current) shading.current.visible = !deferUpdates;
        if (outline.current) outline.current.visible = !deferUpdates;
      },
    );

    return () => {
      unsubscribeBoundListing();
      unsubscribeDeferUpdates();
    };
  }, [id]);

  return (
    <group ref={wrapper}>
      <line_
        ref={outline}
        material={outlineMaterial}
        geometry={unitBufferGeometry2}
        visible={!deferUpdates}
      />
      <mesh
        ref={shading}
        material={shadingMaterial}
        geometry={unitPlane}
        visible={!deferUpdates}
      />
    </group>
  );
};
