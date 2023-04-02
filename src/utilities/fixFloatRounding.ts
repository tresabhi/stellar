const EPSILON = 1e-4;

export default function fixFloatRounding(value: number) {
  return Math.round(value / EPSILON) * EPSILON;
}
