export interface PartMoveEventDetail {
  x: number;
  y: number;
  relative: boolean;
}

export const translatePartsBySelectionAsync = (
  x: number,
  y: number,
  relative = true,
) => {
  window.dispatchEvent(
    new CustomEvent<PartMoveEventDetail>('partmove', {
      detail: { x, y, relative },
    }),
  );
};
