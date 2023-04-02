export default function epsilonEquality(
  a: number,
  b: number,
  epsilon = Number.EPSILON,
): boolean {
  return Math.abs(a - b) < epsilon;
}
