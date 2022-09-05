import DeepPartial from 'types/DeepPartial';

const nullIfSame = <Source1 extends {}, Source2 = DeepPartial<Source1>>(
  source1: Source1,
  source2: Source2,
): DeepPartial<Source1> => {
  const keys = Object.keys(source1);
  const obj1 = source1 as any; // TODO: pretty up the types?
  const obj2 = source2 as any; // I'm too lazy lol

  keys.forEach((key) => {
    if (typeof obj1[key] === 'object') {
      obj1[key] = nullIfSame(obj1[key], obj2[key]);
    } else {
      if (obj1[key] !== obj2[key]) {
        obj1[key] = null;
      }
    }
  });

  return obj1;
};
export default nullIfSame;
