import { PrimitiveBox2 } from 'game/Blueprint';
import useBlueprint from 'hooks/useBlueprint';
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
const unitSquare = new PlaneGeometry(1, 1);
const unitPoints = [
  new Vector2(0, 0),
  new Vector2(1, 0),
  new Vector2(1, 1),
  new Vector2(0, 1),
  new Vector2(0, 0),
];
const outlineGeometry = new BufferGeometry().setFromPoints(unitPoints);

export interface SelectionBoxProps {
  ID: UUID;
}
export const SelectionBox = memo<SelectionBoxProps>(({ ID }) => {
  const outline = useRef<Line>(null!);
  const shading = useRef<Mesh>(null!);

  useEffect(() => {
    const rerender = (boundingBox: PrimitiveBox2) => {
      if (boundingBox) {
        shading.current.scale.set(
          boundingBox.max.x - boundingBox.min.x,
          boundingBox.max.y - boundingBox.min.y,
          1,
        );
        shading.current.position.set(
          boundingBox.min.x + (boundingBox.max.x - boundingBox.min.x) / 2,
          boundingBox.min.y + (boundingBox.max.y - boundingBox.min.y) / 2,
          0,
        );
        outline.current.scale.set(
          boundingBox.max.x - boundingBox.min.x,
          boundingBox.max.y - boundingBox.min.y,
          1,
        );
        outline.current.position.set(boundingBox.min.x, boundingBox.min.y, 0);
      }
    };
    const unsubscribe = useBlueprint.subscribe(
      (state) => state.boundingBoxes[ID],
      rerender,
    );
    const initialState = useBlueprint.getState().boundingBoxes[ID];

    if (initialState) rerender(initialState);

    return () => {
      unsubscribe();
    };
  }, [ID]);

  return (
    <>
      <line_
        ref={outline}
        material={outlineMaterial}
        geometry={outlineGeometry}
      />
      <mesh ref={shading} material={shadedMaterial} geometry={unitSquare} />
    </>
  );
});
