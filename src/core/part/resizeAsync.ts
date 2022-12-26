import { Vector2Tuple } from 'three';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';

export interface PartResizeEventDetail {
  normalizedConstant: Vector2Tuple;
  normalizedScale: Vector2Tuple;
  rotation: number;
}

export default function resizeAsync(
  ids: MethodIds,
  normalizedConstant: Vector2Tuple,
  normalizedScale: Vector2Tuple,
  rotation: number,
) {
  normalizeIds(ids).forEach((id) => {
    window.dispatchEvent(
      new CustomEvent<PartResizeEventDetail>(`partresize${id}`, {
        detail: { normalizedConstant, normalizedScale, rotation },
      }),
    );
  });
}
