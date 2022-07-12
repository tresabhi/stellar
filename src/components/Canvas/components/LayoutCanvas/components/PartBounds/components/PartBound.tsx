import useBounds, { PrimitiveBounds } from 'hooks/useBounds';
import { FC, useEffect, useRef } from 'react';
import {
  BufferGeometry,
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
  const outline = useRef<Line>(null!);
  const shading = useRef<Mesh>(null!);
  const { deferUpdates } = useBounds();

  const rerender = (bound: PrimitiveBounds) => {
    shading.current.scale.set(
      bound.max.x - bound.min.x,
      bound.max.y - bound.min.y,
      1,
    );
    shading.current.position.set(
      bound.min.x + (bound.max.x - bound.min.x) / 2,
      bound.min.y + (bound.max.y - bound.min.y) / 2,
      0,
    );
    outline.current.scale.set(
      bound.max.x - bound.min.x,
      bound.max.y - bound.min.y,
      1,
    );
    outline.current.position.set(bound.min.x, bound.min.y, 0);
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
        shading.current.visible = !deferUpdates;
        outline.current.visible = !deferUpdates;
      },
    );

    return () => {
      unsubscribeBoundListing();
      unsubscribeDeferUpdates();
    };
  }, [id]);

  return (
    <>
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
    </>
  );
};
