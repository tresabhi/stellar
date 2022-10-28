const DECIMAL_PLACES = 4;

export const fixFloatRounding = (value: number) => {
  // TODO: find a more efficient way to do this
  return Number(value.toFixed(DECIMAL_PLACES));
};