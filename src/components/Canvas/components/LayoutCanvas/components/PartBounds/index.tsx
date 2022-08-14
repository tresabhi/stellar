import { LAYER } from 'components/Canvas/constants/layer';
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

export const PartBounds = () => {
  const outline = useRef<Line>(null!);
  const selections = useBlueprint((state) => state.selections);
  const partBounds = selections.map((id) => (
    <PartBound key={`part-bound-${id}`} id={id} />
  ));
  const partBoundsWrapper = useRef<Group>(null!);

  useEffect(() => {
    const rerenderOutline = () => {
      if (selections.length > 1) {
        const box3 = new Box3().setFromObject(partBoundsWrapper.current);

        outline.current.visible = true;
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
      } else {
        outline.current.visible = false;
      }
    };

    rerenderOutline();

    const unsubscribeDeferUpdates = useBounds.subscribe(
      (state) => state.deferUpdates,
      (deferUpdates) => {
        if (deferUpdates) {
          outline.current.visible = false;
        } else {
          rerenderOutline();
        }
      },
    );

    return unsubscribeDeferUpdates;
  }, [selections.length]);

  return (
    <HeadsUpDisplay priority={LAYER.TOOL}>
      <group ref={partBoundsWrapper}>{partBounds}</group>
      <line_
        visible={selections.length > 1}
        ref={outline}
        material={outlineMaterial}
        geometry={unitBufferGeometry2}
      />
    </HeadsUpDisplay>
  );
};

export * from './components/PartBound';
