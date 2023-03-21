import { Vector2Tuple } from 'three';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';

export interface PartTransformEventDetail {
  normalizedConstant: Vector2Tuple;
  normalizedScale: Vector2Tuple;
  rotation: number;
}

export default function transformAsync(
  ids: MethodIds,
  normalizedConstant: Vector2Tuple,
  normalizedScale: Vector2Tuple,
  rotation: number,
) {
  normalizeIds(ids).forEach((id) => {
    window.dispatchEvent(
      new CustomEvent<PartTransformEventDetail>(`parttransform${id}`, {
        detail: { normalizedConstant, normalizedScale, rotation },
      }),
    );
  });
}
