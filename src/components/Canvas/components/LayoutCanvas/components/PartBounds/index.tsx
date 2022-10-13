import { Layer } from 'components/Canvas/constants/layer';
import HeadsUpDisplay from 'components/HeadsUpDisplay';
import { useEffect, useRef } from 'react';
import useBlueprint from 'stores/useBlueprint';
import useBounds from 'stores/useBounds';
import { Box3, Group, Line } from 'three';
import {
  outlineMaterial,
  PartBound,
  unitBufferGeometry2,
} from './components/PartBound';
import { ResizeNode } from './components/ResizeNode';
import { useResizeNode } from './hooks/useResizeNode';

export const PartBounds = () => {
  const wrapper = useRef<Group>(null);
  const outline = useRef<Line>(null);
  const selections = useBlueprint((state) => state.selections);
  const partBounds = selections.map((id) => (
    <PartBound key={`part-bound-${id}`} id={id} />
  ));
  const partBoundsWrapper = useRef<Group>(null);
  const resizeNodes = {
    topLeft: useRef<Group>(null),
    top: useRef<Group>(null),
    topRight: useRef<Group>(null),
    right: useRef<Group>(null),
    bottomRight: useRef<Group>(null),
    bottom: useRef<Group>(null),
    bottomLeft: useRef<Group>(null),
    left: useRef<Group>(null),
  };
  const box3 = new Box3();

  useEffect(() => {
    const resizeOutline = () => {
      if (partBoundsWrapper.current && outline.current && wrapper.current) {
        if (selections.length !== 0) {
          box3.setFromObject(partBoundsWrapper.current);

          wrapper.current.visible = true;

          outline.current.scale.set(
            box3.max.x - box3.min.x,
            box3.max.y - box3.min.y,
            1,
          );
          outline.current.position.set(
            (box3.max.x + box3.min.x) / 2 - outline.current.scale.x / 2,
            (box3.max.y + box3.min.y) / 2 - outline.current.scale.y / 2,
            0,
          );

          resizeNodes.topLeft.current?.position.set(box3.min.x, box3.max.y, 0);
          resizeNodes.top.current?.position.set(
            (box3.min.x + box3.max.x) / 2,
            box3.max.y,
            1,
          );
          resizeNodes.topRight.current?.position.set(box3.max.x, box3.max.y, 0);
          resizeNodes.right.current?.position.set(
            box3.max.x,
            (box3.min.y + box3.max.y) / 2,
            1,
          );
          resizeNodes.bottomRight.current?.position.set(
            box3.max.x,
            box3.min.y,
            1,
          );
          resizeNodes.bottom.current?.position.set(
            (box3.min.x + box3.max.x) / 2,
            box3.min.y,
            1,
          );
          resizeNodes.bottomLeft.current?.position.set(
            box3.min.x,
            box3.min.y,
            1,
          );
          resizeNodes.left.current?.position.set(
            box3.min.x,
            (box3.min.y + box3.max.y) / 2,
            1,
          );
        } else {
          wrapper.current.visible = false;
        }
      }
    };

    resizeOutline();

    const unsubscribeDeferUpdates = useBounds.subscribe(
      (state) => state.deferUpdates,
      (deferUpdates) => {
        if (wrapper.current) {
          if (deferUpdates) {
            wrapper.current.visible = false;
          } else {
            resizeOutline();
          }
        }
      },
    );

    return unsubscribeDeferUpdates;
  }, [selections.length]);

  const handleTopLeftPointerDown = useResizeNode(
    box3,
    (box3) => [box3.max.x, box3.min.y],
    -1,
    -1,
  );
  const handleTopRightPointerDown = useResizeNode(
    box3,
    (box3) => [box3.min.x, box3.min.y],
    1,
    -1,
  );
  const handleBottomRightPointerDown = useResizeNode(
    box3,
    (box3) => [box3.min.x, box3.max.y],
    1,
    1,
  );
  const handleBottomLeftPointerDown = useResizeNode(
    box3,
    (box3) => [box3.max.x, box3.max.y],
    -1,
    1,
  );

  return (
    <HeadsUpDisplay priority={Layer.Tool}>
      <group ref={partBoundsWrapper}>{partBounds}</group>

      <group visible={selections.length !== 0} ref={wrapper}>
        <line_
          ref={outline}
          material={outlineMaterial}
          geometry={unitBufferGeometry2}
        />

        <ResizeNode
          ref={resizeNodes.topLeft}
          onPointerDown={handleTopLeftPointerDown}
        />
        <ResizeNode
          ref={resizeNodes.topRight}
          onPointerDown={handleTopRightPointerDown}
        />
        <ResizeNode
          ref={resizeNodes.bottomRight}
          onPointerDown={handleBottomRightPointerDown}
        />
        <ResizeNode
          ref={resizeNodes.bottomLeft}
          onPointerDown={handleBottomLeftPointerDown}
        />
      </group>
    </HeadsUpDisplay>
  );
};

export * from './components/PartBound';
