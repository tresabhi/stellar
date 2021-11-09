export default function lerp(x1: number, x2: number, lerp: number) {
  return x1 * (1 - lerp) + x2 * lerp;
}
