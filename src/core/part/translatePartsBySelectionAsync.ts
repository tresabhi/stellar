export interface PartMoveEventDetail {
  x: number;
  y: number;
}

export const translatePartsBySelectionAsync = (x: number, y: number) => {
  window.dispatchEvent(
    new CustomEvent<PartMoveEventDetail>('partmove', {
      detail: { x, y },
    }),
  );
};
