/**
 * Thanks, Terry, for [deep partial](https://stackoverflow.com/a/61132308/12294756)
 */
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export default DeepPartial;
