const inverseLerp = (min: number, max: number, current: number) =>
  (current - min) / (max - min);
export default inverseLerp;
