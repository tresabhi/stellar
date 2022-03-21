import PartOutline from 'components/PartOutline';
import { getPart } from 'interfaces/blueprint';
import { useRef } from 'react';
import { Box2, BufferGeometry, Vector2 } from 'three';
import { AnyPart, PartID } from 'types/Parts';

const usePartOutline = <T extends AnyPart>(
  ID: PartID,
  computer: (state: T) => Box2,
) => {
  const partOutlineRef = useRef<SVGLineElement>(null!);
  const recompute = () => {
    const state = getPart<T>(ID);
    if (state) {
      const newBoundingBox = computer(state);
      const geometry = new BufferGeometry().setFromPoints([
        new Vector2(newBoundingBox.min.x, newBoundingBox.min.y),
        new Vector2(newBoundingBox.min.x, newBoundingBox.max.y),
        new Vector2(newBoundingBox.max.x, newBoundingBox.max.y),
        new Vector2(newBoundingBox.max.x, newBoundingBox.min.y),
        new Vector2(newBoundingBox.min.x, newBoundingBox.min.y),
      ]);
      //@ts-ignore
      partOutlineRef.current.geometry = geometry;
    }
  };

  const Component = () => (
    <PartOutline ref={partOutlineRef} boundingBox={new Box2()} />
  );

  const hook = {
    recompute,
    Component,
  };

  return hook;
};
export default usePartOutline;
