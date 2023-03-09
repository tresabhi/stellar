export default function moduloAngle(angle: number) {
  return (angle % 360) + (angle < 0 ? 360 : 0);
}
