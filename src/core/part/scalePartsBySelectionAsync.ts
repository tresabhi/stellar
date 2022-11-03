export interface PartScaleEventDetail {
  x: number;
  y: number;
}

export const scalePartsBySelectionAsync = (x: number, y: number) => {
  window.dispatchEvent(
    new CustomEvent<PartScaleEventDetail>('partmove', { detail: { x, y } }),
  );
};
