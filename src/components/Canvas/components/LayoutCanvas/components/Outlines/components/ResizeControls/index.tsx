import { Line } from '@react-three/drei';
import { useRef } from 'react';
import useBlueprint from 'stores/blueprint';
import { Group } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { UNIT_POINTS } from '../PartsBounds/components/PartBounds';

export const ResizeControls = () => {
  const wrapper = useRef<Group>(null);
  const outline = useRef<Line2>(null);
  const selections = useBlueprint((state) => state.selections);
  // const selectionBounds = useBounds<Bounds>(
  //   (state) => {
  //     if (selections.length === 0) {
  //       const partBounds = state.parts.get(selections[0])?.bounds;
  //       if (partBounds) return partBounds;
  //     }

  //     const box2 = new Box2();
  //     const point = new Vector2();

  //     selections.forEach((selection) => {
  //       const partBounds = state.parts.get(selection)?.bounds;

  //       if (partBounds) {
  //         box2
  //           .expandByPoint(point.set(...sideToPoint(partBounds, [-1, 1])))
  //           .expandByPoint(point.set(...sideToPoint(partBounds, [1, 1])))
  //           .expandByPoint(point.set(...sideToPoint(partBounds, [1, -1])))
  //           .expandByPoint(point.set(...sideToPoint(partBounds, [-1, -1])));
  //       }
  //     });

  //     return {
  //       width: box2.max.x - box2.min.x,
  //       height: box2.max.y - box2.min.y,
  //       x: (box2.min.x + box2.max.x) / 2,
  //       y: (box2.min.y + box2.max.y) / 2,
  //       rotation: 0,
  //     };
  //   },
  //   (a, b) =>
  //     a.width === b.width &&
  //     a.height == b.height &&
  //     a.x === b.x &&
  //     a.y === b.y &&
  //     a.rotation === b.rotation,
  // );

  // useEffect(() => {
  //   if (selections.length > 1) {
  //     outline.current?.position.set(selectionBounds.x, selectionBounds.y, 0);
  //     outline.current?.scale.set(
  //       selectionBounds.width,
  //       selectionBounds.height,
  //       1,
  //     );
  //     outline.current?.rotation.set(0, 0, selectionBounds.rotation);
  //   }

  //   return useBounds.subscribe(
  //     (state) => state.deferUpdates,
  //     (deferUpdates) => {
  //       if (wrapper.current) {
  //         wrapper.current.visible = !deferUpdates && selections.length > 0;
  //       }
  //     },
  //   );
  // });

  return (
    <group ref={wrapper} visible={selections.length > 0}>
      {selections.length > 1 && (
        <Line
          ref={outline}
          lineWidth={1.5}
          color={'#9d5bd2'}
          points={UNIT_POINTS}
        />
      )}

      {/* <ResizeNode // top left
        bounds={selectionBounds}
        constant={[1, -1]}
        movable={[-1, 1]}
      />
      <ResizeNode // top
        bounds={selectionBounds}
        constant={[0, -1]}
        movable={[0, 1]}
        maintainSlope
      />
      <ResizeNode // top right
        bounds={selectionBounds}
        constant={[-1, -1]}
        movable={[1, 1]}
      />
      <ResizeNode // right
        bounds={selectionBounds}
        constant={[-1, 0]}
        movable={[1, 0]}
        maintainSlope
      />
      <ResizeNode // bottom right
        bounds={selectionBounds}
        constant={[-1, 1]}
        movable={[1, -1]}
      />
      <ResizeNode // bottom
        bounds={selectionBounds}
        constant={[0, 1]}
        movable={[0, -1]}
        maintainSlope
      />
      <ResizeNode // bottom left
        bounds={selectionBounds}
        constant={[1, 1]}
        movable={[-1, -1]}
      />
      <ResizeNode // left
        bounds={selectionBounds}
        constant={[1, 0]}
        movable={[-1, 0]}
        maintainSlope
      /> */}
    </group>
  );
};
