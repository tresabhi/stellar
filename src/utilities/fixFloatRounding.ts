const DECIMAL_PLACES = 4;

// TODO: find a more efficient way to do this
export default function fixFloatRounding(value: number) {
  return Number(value.toFixed(DECIMAL_PLACES));
}
