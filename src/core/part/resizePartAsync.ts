import { Vector2Tuple } from 'three';

export interface PartResizeEventDetail {
  constant: Vector2Tuple;
  scale: Vector2Tuple;
}

export const resizePartAsync = (
  id: string,
  constant: Vector2Tuple,
  scale: Vector2Tuple,
) => {
  window.dispatchEvent(
    new CustomEvent<PartResizeEventDetail>(`partresize${id}`, {
      detail: { constant, scale },
    }),
  );
};
