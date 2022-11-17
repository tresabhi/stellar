export type PartRotateEventDetail = number;

export const rotatePartsBySelectionAsync = (z: number) => {
  window.dispatchEvent(
    new CustomEvent<PartRotateEventDetail>('partrotate', { detail: z }),
  );
};
