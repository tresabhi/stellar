export default function validateNumber(value: number) {
  return (
    typeof value === 'number'
    && value !== Infinity
    && value !== -Infinity
    && !Number.isNaN(value)
  );
}
