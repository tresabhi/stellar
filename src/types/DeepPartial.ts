/**
 * Thanks Terry!
 * https://stackoverflow.com/a/61132308/12294756
 */
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export default DeepPartial;
