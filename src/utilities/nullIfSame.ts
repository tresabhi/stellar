import DeepPartial from 'types/DeepPartial';

type NullIfSame = <T1, T2>(source1: T1, source2: T2) => DeepPartial<T1>;

const nullIfSame: NullIfSame = (source1, source2) => {
  const keys = Object.keys(source1);
  let obj1 = source1 as any;
  let obj2 = source2 as any;

  keys.forEach((key) => {
    if (typeof obj1[key] === 'object') {
      obj1[key] = nullIfSame(obj1[key], obj2[key]);
    } else {
      if (obj1[key] !== obj2[key]) {
        obj1[key] = null;
      }
    }
  });

  return obj1 as DeepPartial<typeof source1>;
};
export default nullIfSame;
