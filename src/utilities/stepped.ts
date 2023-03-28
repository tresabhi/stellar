export default function stepped(x: number, step: number) {
  return step === 0 ? x : Math.round(x / step) * step;
}
