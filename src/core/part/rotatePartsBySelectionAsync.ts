export type PartRotateEventDetail = number;

export default function rotatePartsBySelectionAsync(z: number) {
  window.dispatchEvent(
    new CustomEvent<PartRotateEventDetail>('partrotate', { detail: z }),
  );
}
