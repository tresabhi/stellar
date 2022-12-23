import { Vector2Tuple } from 'three';

export interface PartResizeEventDetail {
  normalizedConstant: Vector2Tuple;
  normalizedScale: Vector2Tuple;
  rotation: number;
}

export default function resizePartAsync(
  id: string,
  normalizedConstant: Vector2Tuple,
  normalizedScale: Vector2Tuple,
  rotation: number,
) {
  window.dispatchEvent(
    new CustomEvent<PartResizeEventDetail>(`partresize${id}`, {
      detail: { normalizedConstant, normalizedScale, rotation },
    }),
  );
}
