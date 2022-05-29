import { getPartBound, subscribePartBound } from 'core/bounds';
import useApp from 'hooks/useApp';
import { PrimitiveBound } from 'hooks/useBounds';
import { memo, useEffect, useRef } from 'react';
import { Line, Mesh } from 'three';
import { outlineMaterial } from './constants/outlineMaterial';
import { shadingMaterial } from './constants/shadingMaterial';
import { unitBufferGeometry2 } from './constants/unitBufferGeometry2';
import { unitPlane } from './constants/unitPlane';

export interface SelectionBoxProps {
  id: string;
}
export const SelectionBox = memo<SelectionBoxProps>(({ id }) => {
  const outline = useRef<Line>(null!);
  const shading = useRef<Mesh>(null!);
  const { canBoundsBeUpdated } = useApp();

  useEffect(() => {
    const rerender = (bound: PrimitiveBound) => {
      if (bound) {
        shading.current.scale.set(
          bound.max.x - bound.min.x,
          bound.max.y - bound.min.y,
          1,
        );
        shading.current.position.set(
          bound.min.x + (bound.max.x - bound.min.x) / 2,
          bound.min.y + (bound.max.y - bound.min.y) / 2,
          0,
        );
        outline.current.scale.set(
          bound.max.x - bound.min.x,
          bound.max.y - bound.min.y,
          1,
        );
        outline.current.position.set(bound.min.x, bound.min.y, 0);
      }
    };
    const unsubscribeBound = subscribePartBound(id, (bound) => {
      if (bound) rerender(bound);
    });
    const unsubscribeCanBoundsBeUpdated = useApp.subscribe(
      (state) => state.canBoundsBeUpdated,
      (canBoundsBeUpdated) => {
        const bound = getPartBound(id);

        if (canBoundsBeUpdated && bound) rerender(bound);
        outline.current.visible = canBoundsBeUpdated;
        shading.current.visible = canBoundsBeUpdated;
      },
    );
    const initialState = getPartBound(id);

    if (initialState) rerender(initialState);

    return () => {
      unsubscribeBound();
      unsubscribeCanBoundsBeUpdated();
    };
  }, [id]);

  return (
    <>
      <line_
        ref={outline}
        material={outlineMaterial}
        geometry={unitBufferGeometry2}
        visible={canBoundsBeUpdated}
      />
      <mesh
        ref={shading}
        material={shadingMaterial}
        geometry={unitPlane}
        visible={canBoundsBeUpdated}
      />
    </>
  );
});

export * from './constants/color';
