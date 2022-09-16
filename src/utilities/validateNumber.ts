export const validateNumber = (value: number) => {
  return (
    typeof value === 'number' &&
    value !== Infinity &&
    value !== -Infinity &&
    !isNaN(value)
  );
};
