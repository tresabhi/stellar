import { forwardRef } from 'react';
import { Box2, BufferGeometry, Vector2 } from 'three';

interface PartOutlineProps {
  boundingBox: Box2;
}
const PartOutline = forwardRef<SVGLineElement, PartOutlineProps>(
  ({ boundingBox }, ref) => {
    const geometry = new BufferGeometry().setFromPoints([
      new Vector2(boundingBox.min.x, boundingBox.min.y),
      new Vector2(boundingBox.min.x, boundingBox.max.y),
      new Vector2(boundingBox.max.x, boundingBox.max.y),
      new Vector2(boundingBox.max.x, boundingBox.min.y),
      new Vector2(boundingBox.min.x, boundingBox.min.y),
    ]);

    return (
      //@ts-ignore
      <line ref={ref} geometry={geometry}>
        <lineBasicMaterial color="red" linewidth={2} />
      </line>
    );
  },
);
export default PartOutline;
