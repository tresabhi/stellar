import GetDifferentObjectKeys from './GetDifferentObjectKeys';

type GetMutualObjectKeys<T, U> = Omit<
  T | U,
  keyof GetDifferentObjectKeys<T, U>
>;

export default GetMutualObjectKeys;
