import GetDifferentObjectKeys from './GetDifferentObjectKeys';
import GetMutualObjectKeys from './GetMutualObjectKeys';

/**
 * Tanks Jakub Švehla
 * https://dev.to/svehla/typescript-how-to-deep-merge-170c
 */
type MergeTypes<
  T,
  U,
  T0 = Partial<GetDifferentObjectKeys<T, U>> & {
    [K in keyof GetMutualObjectKeys<T, U>]: T[K] | U[K];
  },
  T1 = { [K in keyof T0]: T0[K] },
> = T1;

export default MergeTypes;
