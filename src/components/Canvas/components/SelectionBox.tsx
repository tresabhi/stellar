import { getPartRegistry } from 'core/part';
import usePartProperty from 'hooks/usePartProperty';
import { FC, useRef } from 'react';
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
  opacity: 0.1,
});

export interface SelectionBoxProps {
  ID: UUID;
}
export const SelectionBox: FC<SelectionBoxProps> = ({ ID }) => {
  const line = useRef<Line>(null!);
  const plane = useRef<Mesh>(null!);

  usePartProperty(
    ID,
    (state) => state,
    (state) => {
      const computeBoundingBox = getPartRegistry(state.n)?.computeBoundingBox;

      if (computeBoundingBox) {
        const boundingBox = computeBoundingBox(state);
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
    },
  );

  return (
    <>
      <line_ ref={line} material={outlineMaterial} />
      <mesh ref={plane} material={shadedMaterial} />
    </>
  );
};
