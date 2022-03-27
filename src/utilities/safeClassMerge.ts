import { isUndefined } from 'lodash';

type basicObject = { [key: string]: any };

const safeClassMerge = (base: basicObject, source: basicObject) => {
  const keys = Object.keys(source);

  keys.forEach((key) => {
    if (
      !isUndefined(base[key]) && // base property has to exist
      typeof base[key] !== 'function' && // base property has to be a primitive
      typeof base[key] === typeof source[key] // base property has to be the same type as the source property
    ) {
      if (typeof source[key] === 'object') {
        safeClassMerge(base[key], source[key]);
      } else {
        base[key] = source[key];
      }
    }
  });
};
export default safeClassMerge;
