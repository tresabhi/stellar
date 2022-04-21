import { getPart } from 'interfaces/blueprint';
import { getPartBoundingBoxComputer } from 'interfaces/part';
import { FC, useEffect, useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import { Box2, BufferGeometry, Vector2 } from 'three';
import compareStringArrays from 'utilities/compareStringArrays';

const WIDTH = 100;

interface OutlineProps {
  outline: Box2;
}
export const Outline: FC<OutlineProps> = ({ outline }) => {
  const geometryRef = useRef<BufferGeometry>(null!);

  useEffect(() => {
    const points = [
      new Vector2(outline.min.x, outline.min.y),
      new Vector2(outline.max.x, outline.min.y),
      new Vector2(outline.max.x, outline.max.y),
      new Vector2(outline.min.x, outline.max.y),
      new Vector2(outline.min.x, outline.min.y),
    ];

    geometryRef.current.setFromPoints(points);
  }, [outline.min.x, outline.min.y, outline.max.x, outline.max.y]);

  return (
    <group>
      <line>
        <bufferGeometry ref={geometryRef} />
        <lineBasicMaterial
          color="hsl(270, 70%, 60%)"
          depthTest={false}
          linewidth={WIDTH / 2}
        />
      </line>
    </group>
  );
};

const Selections = () => {
  const selections = blueprintStore(
    (state) => state.selections,
    compareStringArrays,
  );

  const outlines: JSX.Element[] = [];

  selections.forEach((selection) => {
    const part = getPart(selection);

    if (part) {
      const boundingBoxComputer = getPartBoundingBoxComputer(part.n);

      if (boundingBoxComputer)
        outlines.push(
          <Outline
            outline={boundingBoxComputer(part)}
            key={`outline-${selection}`}
          />,
        );
    }
  });

  return <group>{outlines}</group>;
};
export default Selections;
