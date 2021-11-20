/**
 * Thanks David Sherret!
 * stackoverflow.com/a/40076355/12294756
 */
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export default DeepPartial;
