type GetDifferentObjectKeys<
  T,
  U,
  T0 = Omit<T, keyof U> & Omit<U, keyof T>,
  T1 = {
    [K in keyof T0]: T0[K];
  },
> = T1;

export default GetDifferentObjectKeys;
