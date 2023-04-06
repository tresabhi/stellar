export default function normalizeAngle(angle: number, degrees = false) {
  const circumference = degrees ? 360 : 2 * Math.PI;
  const mod = angle % circumference;
  return mod + (mod < 0 ? circumference : 0);
}
