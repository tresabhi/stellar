export interface PartScaleEventDetail {
  x: number;
  y: number;
}

export const scaleSelectedAsync = (x: number, y: number) => {
  window.dispatchEvent(
    new CustomEvent<PartScaleEventDetail>('partscale', { detail: { x, y } }),
  );
};
