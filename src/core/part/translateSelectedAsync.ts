export interface PartMoveEventDetail {
  x: number;
  y: number;
  relative: boolean;
}

export default function translateSelectedAsync(
  x: number,
  y: number,
  relative = true,
) {
  window.dispatchEvent(
    new CustomEvent<PartMoveEventDetail>('partmove', {
      detail: { x, y, relative },
    }),
  );
}
