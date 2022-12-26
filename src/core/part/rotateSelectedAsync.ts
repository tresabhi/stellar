export type PartRotateEventDetail = number;

export default function rotateSelectedAsync(z: number) {
  window.dispatchEvent(
    new CustomEvent<PartRotateEventDetail>('partrotate', { detail: z }),
  );
}
