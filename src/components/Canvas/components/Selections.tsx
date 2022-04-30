import usePartProperty from 'hooks/usePartProperty';
import { getPartBoundingBoxComputer } from 'interfaces/part';
import { FC, useEffect, useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import { Group, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';
import { UUID } from 'types/Parts';

const LINE_WIDTH = 0.15;
const selectionMaterial = new MeshBasicMaterial({
  depthWrite: false,
  depthTest: false,
  color: 'hsl(270, 70%, 45%)',
});

interface SelectionProps {
  ID: UUID;
}
const Selection: FC<SelectionProps> = ({ ID }) => {
  const topRef = useRef<Mesh>(null!);
  const rightRef = useRef<Mesh>(null!);
  const bottomRef = useRef<Mesh>(null!);
  const leftRef = useRef<Mesh>(null!);

  usePartProperty(
    ID,
    (state) => state,
    (state) => {
      const boundingBoxComputer = getPartBoundingBoxComputer(state.n);

      if (boundingBoxComputer) {
        const boundingBox = boundingBoxComputer(state);
        const widthGeometry = new PlaneGeometry(
          boundingBox.max.x - boundingBox.min.x + LINE_WIDTH,
          LINE_WIDTH,
        );
        const heightGeometry = new PlaneGeometry(
          LINE_WIDTH,
          boundingBox.max.y - boundingBox.min.y + LINE_WIDTH,
        );
        const middleX = (boundingBox.min.x + boundingBox.max.x) / 2;
        const middleY = (boundingBox.min.y + boundingBox.max.y) / 2;

        topRef.current.geometry = widthGeometry;
        rightRef.current.geometry = heightGeometry;
        bottomRef.current.geometry = widthGeometry;
        leftRef.current.geometry = heightGeometry;

        topRef.current.position.set(middleX, boundingBox.max.y, 0);
        rightRef.current.position.set(boundingBox.max.x, middleY, 0);
        bottomRef.current.position.set(middleX, boundingBox.min.y, 0);
        leftRef.current.position.set(boundingBox.min.x, middleY, 0);
      }
    },
  );

  return (
    <group>
      <mesh ref={topRef} material={selectionMaterial} />
      <mesh ref={rightRef} material={selectionMaterial} />
      <mesh ref={bottomRef} material={selectionMaterial} />
      <mesh ref={leftRef} material={selectionMaterial} />
    </group>
  );
};

const Selections = () => {
  const selections = blueprintStore((state) => state.selections);
  const boxes = selections.map((selection) => (
    <Selection ID={selection} key={`part-${selection}`} />
  ));
  const initialState = blueprintStore.getState();
  const meshRef = useRef<Group>(null);

  useEffect(() => {
    const unsubscribe = blueprintStore.subscribe(
      (state) => state.offset,
      (offset) => {
        meshRef.current?.position.setX(offset.x);
        meshRef.current?.position.setY(offset.y);
      },
    );

    return unsubscribe;
  }, []);

  return (
    <group
      ref={meshRef}
      position={[initialState.offset.x, initialState.offset.y, 0]}
    >
      {boxes}
    </group>
  );
};
export default Selections;
