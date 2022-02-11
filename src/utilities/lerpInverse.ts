const lerpInverse = (min: number, max: number, current: number) =>
  (current - min) / (max - min);
export default lerpInverse;
