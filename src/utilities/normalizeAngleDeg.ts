export default function normalizeAngleDeg(angle: number) {
  const mod = angle % 360;
  return mod + (mod < 0 ? 360 : 0);
}
