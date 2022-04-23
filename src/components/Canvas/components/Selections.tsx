import usePartProperty from 'hooks/usePartProperty';
import { getPartBoundingBoxComputer } from 'interfaces/part';
import { FC, useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { UUID } from 'types/Parts';

const WIDTH = 0.004;

interface SelectionProps {
  ID: UUID;
}
const Selection: FC<SelectionProps> = ({ ID }) => {
  const lineRef = useRef<Line2>(null!);

  usePartProperty(
    ID,
    (state) => state,
    (state) => {
      const boundingBoxComputer = getPartBoundingBoxComputer(state.n);

      if (boundingBoxComputer) {
        const boundingBox = boundingBoxComputer(state);

        lineRef.current.geometry.setPositions([
          boundingBox.min.x,
          boundingBox.min.y,
          0,

          boundingBox.max.x,
          boundingBox.min.y,
          0,

          boundingBox.max.x,
          boundingBox.max.y,
          0,

          boundingBox.min.x,
          boundingBox.max.y,
          0,

          boundingBox.min.x,
          boundingBox.min.y,
          0,
        ]);
      }
    },
  );

  return (
    <group>
      <line2 ref={lineRef}>
        <lineGeometry />
        <lineMaterial
          color="hsl(270, 70%, 55%)"
          depthTest={false}
          linewidth={WIDTH}
        />
      </line2>
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
