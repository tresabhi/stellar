import { useEffect, useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import { Group } from 'three';
import { SelectionBox } from './SelectionBox';

export const SelectionBoxes = () => {
  const selections = blueprintStore((state) => state.selections);
  const boxes = selections.map((selection) => (
    <SelectionBox ID={selection} key={`part-${selection}`} />
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
