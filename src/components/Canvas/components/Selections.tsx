import usePartProperty from 'hooks/usePartProperty';
import { getPartBoundingBoxComputer } from 'interfaces/part';
import { FC, useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import { BufferGeometry, Vector2 } from 'three';
import { UUID } from 'types/Parts';

const WIDTH = 1;

interface SelectionProps {
  ID: UUID;
}
const Selection: FC<SelectionProps> = ({ ID }) => {
  const geometryRef = useRef<BufferGeometry>(null!);

  usePartProperty(
    ID,
    (state) => state,
    (state) => {
      const boundingBoxComputer = getPartBoundingBoxComputer(state.n);

      if (boundingBoxComputer) {
        const boundingBox = boundingBoxComputer(state);
        const points = [
          new Vector2(boundingBox.min.x, boundingBox.min.y),
          new Vector2(boundingBox.max.x, boundingBox.min.y),
          new Vector2(boundingBox.max.x, boundingBox.max.y),
          new Vector2(boundingBox.min.x, boundingBox.max.y),
          new Vector2(boundingBox.min.x, boundingBox.min.y),
        ];

        geometryRef.current.setFromPoints(points);
      }
    },
  );

  return (
    <group>
      <line>
        <bufferGeometry ref={geometryRef} />
        <lineBasicMaterial
          color="hsl(270, 70%, 50%)"
          depthTest={false}
          linewidth={WIDTH}
        />
      </line>
    </group>
  );
};

const Selections = () => {
  const selections = blueprintStore((state) => state.selections);
  const boxes = selections.map((selection) => (
    <Selection ID={selection} key={`part-${selection}`} />
  ));

  return <group>{boxes}</group>;
};
export default Selections;
