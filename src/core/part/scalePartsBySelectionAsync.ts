export interface PartScaleEventDetail {
  x: number;
  y: number;
}

// TODO: rename to scaleSelectedPartsAsync
export const scalePartsBySelectionAsync = (x: number, y: number) => {
  window.dispatchEvent(
    new CustomEvent<PartScaleEventDetail>('partscale', { detail: { x, y } }),
  );
};
