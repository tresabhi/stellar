const snap = (x: number, step: number) => (step === 0 ? x : Math.round(x / step) * step);
export default snap;
