import useBoundingBoxes, { PrimitiveBox2 } from 'hooks/useBoundingBoxes';
import { memo, useEffect, useRef } from 'react';
import {
  BufferGeometry,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Vector2,
} from 'three';
import { UUID } from 'types/Parts';

const COLOR = 'hsl(270, 60%, 30%)';

const outlineMaterial = new LineBasicMaterial({
  color: COLOR,
});
const shadedMaterial = new MeshBasicMaterial({
  color: COLOR,
  transparent: true,
  opacity: 0.25,
});

export interface SelectionBoxProps {
  ID: UUID;
}
export const SelectionBox = memo<SelectionBoxProps>(({ ID }) => {
  const line = useRef<Line>(null!);
  const plane = useRef<Mesh>(null!);

  useEffect(() => {
    const rerender = (boundingBox: PrimitiveBox2) => {
      if (boundingBox) {
        const outlineGeometry = new BufferGeometry();
        const positions = [
          new Vector2(boundingBox.min.x, boundingBox.min.y),
          new Vector2(boundingBox.max.x, boundingBox.min.y),
          new Vector2(boundingBox.max.x, boundingBox.max.y),
          new Vector2(boundingBox.min.x, boundingBox.max.y),
          new Vector2(boundingBox.min.x, boundingBox.min.y),
        ];
        const shadedGeometry = new PlaneGeometry(
          boundingBox.max.x - boundingBox.min.x,
          boundingBox.max.y - boundingBox.min.y,
        );

        outlineGeometry.setFromPoints(positions);
        line.current.geometry = outlineGeometry;
        plane.current.geometry = shadedGeometry;
        plane.current.position.set(
          boundingBox.min.x + (boundingBox.max.x - boundingBox.min.x) / 2,
          boundingBox.min.y + (boundingBox.max.y - boundingBox.min.y) / 2,
          0,
        );
      }
    };
    const unsubscribe = useBoundingBoxes.subscribe(
      (state) => state[ID],
      rerender,
    );
    const initialState = useBoundingBoxes.getState()[ID];

    if (initialState) rerender(initialState);

    return () => {
      unsubscribe();
    };
  }, [ID]);

  return (
    <>
      <line_ ref={line} material={outlineMaterial} />
      <mesh ref={plane} material={shadedMaterial} />
    </>
  );
});
